import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MyBookingsPage() {

  const navigate = useNavigate()

  // Email state for looking up bookings
  const [email, setEmail] = useState('')
  const [searched, setSearched] = useState(false)

  // Mock bookings data — will be replaced with API call in Phase 2
  const mockBookings = [
    {
      id: 1,
      ref: 'SK4J9XQ2',
      flight: 'SK101',
      from: 'London',
      to: 'New York',
      departure: '08:00',
      seat: '5A',
      price: 399,
      status: 'confirmed',
      email: 'test@email.com'
    },
    {
      id: 2,
      ref: 'SKAB12CD',
      flight: 'SK202',
      from: 'London',
      to: 'Dubai',
      departure: '14:30',
      seat: '12C',
      price: 289,
      status: 'confirmed',
      email: 'test@email.com'
    },
    {
      id: 3,
      ref: 'SK99XYZ1',
      flight: 'SK303',
      from: 'London',
      to: 'Tokyo',
      departure: '10:00',
      seat: '1A',
      price: 520,
      status: 'cancelled',
      email: 'test@email.com'
    },
  ]

  // Filters bookings by the email the user entered
  const myBookings = mockBookings.filter(
    (booking) => booking.email.toLowerCase() === email.toLowerCase()
  )

  // Cancels a booking by updating its status to cancelled
  const [bookings, setBookings] = useState(mockBookings)

  const handleCancel = (id) => {
    setBookings(bookings.map((booking) =>
      booking.id === id ? { ...booking, status: 'cancelled' } : booking
    ))
  }

  const handleSearch = () => {
    setSearched(true)
  }

  // Filters from the stateful bookings array instead of mockBookings
  const results = bookings.filter(
    (booking) => booking.email.toLowerCase() === email.toLowerCase()
  )

  return (
    <div>

      {/* Email Search */}
      <section>
        <h2>My Bookings</h2>
        <p>Enter your email address to view your bookings</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Find Bookings</button>
      </section>

      {/* Booking Results */}
      {searched && (
        <section>
          {results.length === 0 ? (
            <p>No bookings found for this email address</p>
          ) : (
            results.map((booking) => (
              <div key={booking.id}>
                <h3>Booking Reference: {booking.ref}</h3>
                <p>Flight: {booking.flight}</p>
                <p>Route: {booking.from} → {booking.to}</p>
                <p>Departure: {booking.departure}</p>
                <p>Seat: {booking.seat}</p>
                <p>Price: £{booking.price}</p>
                <p>Status: {booking.status}</p>

                {/* Only show cancel button if booking is confirmed */}
                {booking.status === 'confirmed' && (
                  <button onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
                )}
              </div>
            ))
          )}
        </section>
      )}

    </div>
  )
}

export default MyBookingsPage