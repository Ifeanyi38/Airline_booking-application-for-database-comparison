import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/search" element={<div>Search Results</div>} />
      <Route path="/booking" element={<div>Booking Page</div>} />
      <Route path="/my-bookings" element={<div>My Bookings</div>} />
      <Route path="/confirmation" element={<div>Confirmation</div>} />
    </Routes>
  )
}

export default App