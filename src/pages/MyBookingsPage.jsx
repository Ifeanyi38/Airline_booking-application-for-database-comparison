import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getBookingsByEmail, cancelBooking } from '../services/api'

function MyBookingsPage() {

  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch bookings from Django API by email
  const handleSearch = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const response = await getBookingsByEmail(email)
      setBookings(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load bookings. Please try again.')
      setLoading(false)
    }
  }

  // Cancel a booking via Django API
  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      // Update the booking status in state without refetching
      setBookings(bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ))
    } catch (err) {
      alert('Failed to cancel booking. Please try again.')
    }
  }

  return (
    <div className="page">

      {/* Back to Home */}
      <Link to="/">← Back to Home</Link>

      {/* Email Search */}
      <section className="card">
        <h2>My Bookings</h2>
        <p>Enter your email address to view your bookings</p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={handleSearch}>Find Bookings</button>
      </section>

      {/* Loading state */}
      {loading && <p>Loading your bookings...</p>}

      {/* Error state */}
      {error && <p>{error}</p>}

      {/* Booking Results */}
      {searched && !loading && (
        <section>
          {bookings.length === 0 ? (
            <p>No bookings found for this email address</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="card">
                <h3>Booking Reference: {booking.booking_reference}</h3>
                <p>Flight: {booking.flight.flight_number}</p>
                <p>Route: {booking.flight.origin.city} → {booking.flight.destination.city}</p>
                <p>Departure: {booking.flight.departure_time}</p>
                <p>Seat: {booking.seat.seat_number} ({booking.seat.seat_class})</p>
                <p>Passenger: {booking.passenger.first_name} {booking.passenger.last_name}</p>
                <p>Price: £{booking.total_price}</p>
                <p>Status: <span className={booking.status === 'confirmed' ? 'badge-confirmed' : 'badge-cancelled'}>{booking.status}</span></p>

                {/* Only show cancel button if booking is confirmed */}
                {booking.status === 'confirmed' && (
                  <button className="btn-danger" onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
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