import { useSearchParams, useNavigate, Link } from 'react-router-dom'

function ConfirmationPage() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Read booking details passed from the booking page via URL parameters
  const ref     = searchParams.get('ref')
  const flight  = searchParams.get('flight')
  const from    = searchParams.get('from')
  const to      = searchParams.get('to')
  const seat    = searchParams.get('seat')
  const name    = searchParams.get('name')
  const price   = searchParams.get('price')

  return (
    <div className="page">

      {/* Back to Home */}
      <Link to="/">← Back to Home</Link>

      {/* Success Message */}
      <section className="card" style={{ textAlign: 'center' }}>
        <h2>Booking Confirmed!</h2>
        <p>Your booking reference is:</p>
        <div className="confirmation-ref">{ref}</div>
        <p>Save this reference to view or cancel your booking later</p>
      </section>

      {/* Booking Summary */}
      <section className="card">
        <h3>Booking Summary</h3>
        <p>Passenger: {name}</p>
        <p>Flight: {flight}</p>
        <p>Route: {from} → {to}</p>
        <p>Seat: {seat}</p>
        <p>Total Price: £{price}</p>
      </section>

      {/* Navigation Buttons */}
      <section>
        <button className="btn-primary" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
        <button className="btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
      </section>

    </div>
  )
}

export default ConfirmationPage