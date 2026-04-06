import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaPlane } from 'react-icons/fa'

function HomePage() {

  // Controls whether return date input is visible
  const [tripType, setTripType] = useState('round')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departure, setDeparture] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)

  const navigate = useNavigate()

  // Packages all search inputs into URL query parameters
  // e.g. /search?from=LHR&to=JFK&departure=2025-04-12&trip=round
  const handleSearch = () => {
    navigate(`/search?from=${from}&to=${to}&departure=${departure}&return=${returnDate}&passengers=${passengers}&trip=${tripType}`)
  }

  return (
    <div>

      {/* Navbar */}
      <nav>
        <h1>SkyLine <FaPlane /></h1>
        <ul>
          <li><Link to="/">Flights</Link></li>
          <li><Link to="/my-bookings">My Trips</Link></li>
          <li><Link to="#">Help</Link></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h2>Fly to anywhere you dream of</h2>
        <p>Search thousands of routes and book in seconds</p>
      </section>

      {/* Search Bar */}
      <section className="search-bar">
        <div className="trip-toggle">
          <button onClick={() => setTripType('round')}>Round Trip</button>
          <button onClick={() => setTripType('oneway')}>One Way</button>
        </div>
        <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} />

        {/* Only renders when trip type is round */}
        {tripType === 'round' && (
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        )}

        <input type="number" placeholder="Passengers" min="1" value={passengers} onChange={(e) => setPassengers(e.target.value)} />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </section>

    </div>
  )
}

export default HomePage