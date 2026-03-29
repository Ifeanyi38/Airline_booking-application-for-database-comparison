import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/search" element={<div>Search Results</div>} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  )
}

export default App