import { useSearchParams, useNavigate } from 'react-router-dom'

function ConfirmationPage() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Read booking details passed from the booking page via URL parameters
  const ref = searchParams.get('ref')
  const flight = searchParams.get('flight')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const seat = searchParams.get('seat')
  const name = searchParams.get('name')
  const price = searchParams.get('price')

  return (
    <div>

      {/* Success Message */}
      <section>
        <h2>Booking Confirmed!</h2>
        <p>Your booking reference is:</p>
        <h1>{ref}</h1>
        <p>Save this reference to view or cancel your booking later</p>
      </section>

      {/* Booking Summary */}
      <section>
        <h3>Booking Summary</h3>
        <p>Passenger: {name}</p>
        <p>Flight: {flight}</p>
        <p>Route: {from} → {to}</p>
        <p>Seat: {seat}</p>
        <p>Total Price: £{price}</p>
      </section>

      {/* Navigation Buttons */}
      <section>
        <button onClick={() => navigate('/my-bookings')}>View My Bookings</button>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </section>

    </div>
  )
}

export default ConfirmationPage