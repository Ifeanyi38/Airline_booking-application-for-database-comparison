import { useSearchParams, useNavigate } from 'react-router-dom'
import sampleFlights from '../data/sampleFlights'

function SearchResultsPage() {

  // useSearchParams reads the query parameters from the URL
  
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const departure = searchParams.get('departure')
  const passengers = searchParams.get('passengers')
  const tripType = searchParams.get('trip')

  // Shows all flights if search fields are empty, otherwise filters by from and to
  // .includes() allows partial matches so user can type city name or airport code
  // Both from and to must match for a flight to appear in results
const filteredFlights = sampleFlights.filter(
  (flight) =>
    (flight.fromCity.toLowerCase().includes(from.toLowerCase()) ||
    flight.from.toLowerCase().includes(from.toLowerCase())) &&
    (flight.toCity.toLowerCase().includes(to.toLowerCase()) ||
    flight.to.toLowerCase().includes(to.toLowerCase()))
)

  const handleSelect = (flight) => {
    navigate(`/booking?flightId=${flight.id}&passengers=${passengers}`)
  }

  return (
    <div>

      {/* Search Summary */}
      <section>
        <h2>{from} → {to}</h2>
        <p>{departure} · {passengers} passenger(s) · {tripType === 'round' ? 'Round Trip' : 'One Way'}</p>
      </section>

      {/* Flight Results */}
      <section>
        {filteredFlights.length === 0 ? (
          <p>No flights found for this route.</p>
        ) : (
          filteredFlights.map((flight) => (
            <div key={flight.id}>
              <h3>{flight.flightNumber} — {flight.fromCity} → {flight.toCity}</h3>
              <p>{flight.departure} → {flight.arrival}</p>
              <p>Duration: {flight.duration}</p>
              <p>Stops: {flight.stops === 0 ? 'Direct' : `${flight.stops} stop`}</p>
              <p>Class: {flight.class}</p>
              <p>Price: £{flight.price}</p>
              <button onClick={() => handleSelect(flight)}>Select</button>
            </div>
          ))
        )}
      </section>

    </div>
  )
}

export default SearchResultsPage