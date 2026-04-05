import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import sampleFlights from '../data/sampleFlights'

function BookingPage() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Get the flight id and passengers from the URL
  const flightId = parseInt(searchParams.get('flightId'))
  const passengers = searchParams.get('passengers')

  // Find the selected flight from the mock data using the flight id
  const flight = sampleFlights.find((f) => f.id === flightId)

  // Passenger details state — maps directly to the passenger table in the database
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [passport, setPassport] = useState('')
  const [dob, setDob] = useState('')

  // Selected seat state
  const [selectedSeat, setSelectedSeat] = useState(null)

  // Generates seat rows 1-20 and columns A-F
  const rows = Array.from({ length: 20 }, (_, i) => i + 1)
  const cols = ['A', 'B', 'C', 'D', 'E', 'F']

  // Determines seat class based on row number
  const getSeatClass = (row) => {
    if (row <= 2) return 'first'
    if (row <= 6) return 'business'
    return 'economy'
  }

  // Generates a random booking reference e.g. SK4J9XQ2
  const generateRef = () => {
    return 'SK' + Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleConfirm = () => {
    if (!firstName || !lastName || !email || !passport || !dob || !selectedSeat) {
      alert('Please fill in all fields and select a seat')
      return
    }

    const bookingRef = generateRef()
    navigate(`/confirmation?ref=${bookingRef}&flight=${flight.flightNumber}&from=${flight.fromCity}&to=${flight.toCity}&seat=${selectedSeat}&name=${firstName} ${lastName}&price=${flight.price}`)
  }

  if (!flight) return <p>Flight not found</p>

  return (
    <div className="page">

      {/* Flight Summary */}
      <section className="card">
        <h2>Booking — {flight.flightNumber}</h2>
        <p>{flight.fromCity} → {flight.toCity}</p>
        <p>{flight.departure} → {flight.arrival} · {flight.duration}</p>
        <p>Price: £{flight.price}</p>
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

      {/* Seat Selection */}
      <section className="card">
        <h3>Select a Seat</h3>
        <p>First Class: rows 1-2 · Business: rows 3-6 · Economy: rows 7-20</p>
        <div className="seat-map">
          {rows.map((row) => (
            <div key={row} className="seat-row">
              {cols.map((col) => {
                const seatId = `${row}${col}`
                const seatClass = getSeatClass(row)
                return (
                  <button
                    key={seatId}
                    onClick={() => setSelectedSeat(seatId)}
                    className={`seat seat-${seatClass} ${selectedSeat === seatId ? 'seat-selected' : ''}`}
                  >
                    {seatId}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        {selectedSeat && <p>Selected seat: <strong>{selectedSeat}</strong></p>}
      </section>

      {/* Confirm Button */}
      <section>
        <button className="btn-primary" onClick={handleConfirm}>Confirm Booking</button>
      </section>

    </div>
  )
}

export default BookingPage