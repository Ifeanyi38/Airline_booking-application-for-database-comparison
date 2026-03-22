import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/search" element={<div>Search Results</div>} />
      <Route path="/booking" element={<div>Booking Page</div>} />
      <Route path="/my-bookings" element={<div>My Bookings</div>} />
      <Route path="/confirmation" element={<div>Confirmation</div>} />
    </Routes>
  )
}

export default App