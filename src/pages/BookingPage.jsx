import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { getFlightSeats, createBooking } from '../services/api'
import axios from 'axios'

function BookingPage() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const flightId = parseInt(searchParams.get('flightId'))
  const passengers = searchParams.get('passengers')

  // Flight and seats state — fetched from Django API
  const [flight, setFlight] = useState(null)
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Passenger details state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [passport, setPassport] = useState('')
  const [dob, setDob] = useState('')

  // Selected seat state
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch available seats for this flight from Django
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seatsResponse = await getFlightSeats(flightId)
        setSeats(seatsResponse.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load flight details. Please try again.')
        setLoading(false)
      }
    }

    fetchData()
  }, [flightId])

  const handleConfirm = async () => {
    if (!firstName || !lastName || !email || !passport || !dob || !selectedSeat) {
      alert('Please fill in all fields and select a seat')
      return
    }

    setSubmitting(true)

    try {
      const bookingData = {
        first_name:      firstName,
        last_name:       lastName,
        email:           email,
        phone:           phone,
        passport_number: passport,
        date_of_birth:   dob,
        flight_id:       flightId,
        seat_id:         selectedSeat.id,
      }

      const response = await createBooking(bookingData)
      const booking  = response.data

      // Navigate to confirmation with real booking details
      navigate(`/confirmation?ref=${booking.booking_reference}&flight=${booking.flight.flight_number}&from=${booking.flight.origin.city}&to=${booking.flight.destination.city}&seat=${booking.seat.seat_number}&name=${firstName} ${lastName}&price=${booking.total_price}`)

    } catch (err) {
      alert('Booking failed. The seat may already be taken. Please select another seat.')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Loading flight details...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="page">

      {/* Back to Search */}
      <Link to="/search">← Back to Search Results</Link>

      {/* Flight Summary */}
      <section className="card">
        <h2>Booking — Flight {flightId}</h2>
        <p>Passengers: {passengers}</p>
      </section>

      {/* Passenger Details Form */}
      <section className="card">
        <h3>Passenger Details</h3>
        <div className="form-group">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="text" placeholder="Passport Number" value={passport} onChange={(e) => setPassport(e.target.value)} />
          <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
      </section>

      {/* Seat Selection — real seats from Django */}
      <section className="card">
        <h3>Select a Seat</h3>
        <p>Gold = First Class · Blue = Business · Gray = Economy · Dark = Selected</p>
        <div className="seat-map">
          {seats.map((seat) => (
            <button
              key={seat.id}
              disabled={!seat.available}
              onClick={() => setSelectedSeat(seat)}
              className={`seat seat-${seat.seat_class} ${selectedSeat?.id === seat.id ? 'seat-selected' : ''} ${!seat.available ? 'seat-taken' : ''}`}
            >
              {seat.seat_number}
            </button>
          ))}
        </div>
        {selectedSeat && <p>Selected seat: <strong>{selectedSeat.seat_number} ({selectedSeat.seat_class})</strong></p>}
      </section>

      {/* Confirm Button */}
      <section>
        <button
          className="btn-primary"
          onClick={handleConfirm}
          disabled={submitting}
        >
          {submitting ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </section>

    </div>
  )
}

export default BookingPage