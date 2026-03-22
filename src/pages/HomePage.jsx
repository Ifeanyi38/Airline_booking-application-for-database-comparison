import { useState } from 'react'
import { FaPlane } from 'react-icons/fa'
{/*  used react usestate to be able to toggle between return booking and single flight booking  */}
function HomePage() {
  const [tripType, setTripType] = useState('round')

  return (
    <div>

      {/* Navbar */}
      <nav>
        <h1>SkyLine  <FaPlane /></h1>
        <ul>
          <li><a href="#">Flights</a></li>
          <li><a href="#">My Trips</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section>
        <h2>Fly to anywhere you dream of</h2>
        <p>Search thousands of routes and book in seconds</p>
      </section>
      {/*implemented the usesate using '&&'}
      {/* Search Bar */}
      <section>
        <div>
          <button onClick={() => setTripType('round')}>Round Trip</button>
          <button onClick={() => setTripType('oneway')}>One Way</button>
        </div>
        <input type="text" placeholder="From" />
        <input type="text" placeholder="To" />
        <input type="date" placeholder="Departure" />
        {tripType === 'round' && (
          <input type="date" placeholder="Return" />
        )}
        <input type="number" placeholder="Passengers" min="1" />
        <button>Search</button>
      </section>

    </div>
  )
}

export default HomePage