import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { searchFlights } from '../services/api'

function SearchResultsPage() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const departure = searchParams.get('departure')
  const passengers = searchParams.get('passengers')
  const tripType = searchParams.get('trip')

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch flights from Django API when the page loads
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await searchFlights(from, to)
        setFlights(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load flights. Please try again.')
        setLoading(false)
      }
    }

    fetchFlights()
  }, [from, to])

  const handleSelect = (flight) => {
    navigate(`/booking?flightId=${flight.id}&passengers=${passengers}`)
  }

  if (loading) return <p>Loading flights...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="page">

      {/* Back to Home */}
      <Link to="/">← Back to Home</Link>

      {/* Search Summary */}
      <section>
        <h2>{from} → {to}</h2>
        <p>{departure} · {passengers} passenger(s) · {tripType === 'round' ? 'Round Trip' : 'One Way'}</p>
      </section>

      {/* Flight Results */}
      <section>
        {flights.length === 0 ? (
          <p>No flights found for this route.</p>
        ) : (
          flights.map((flight) => (
            <div key={flight.id} className="card">
              <h3>{flight.flight_number} — {flight.origin.city} → {flight.destination.city}</h3>
              <p>{flight.departure_time} → {flight.arrival_time}</p>
              <p>Status: {flight.status}</p>
              <p>Price: £{flight.base_price}</p>
              <button className="btn-primary" onClick={() => handleSelect(flight)}>Select</button>
            </div>
          ))
        )}
      </section>

    </div>
  )
}

export default SearchResultsPage