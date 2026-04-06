import axios from 'axios'

// Base URL for all API calls — points to our Django backend
const API = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// ── Flights ──────────────────────────────────────────────────────────────────

// Search flights by origin and destination city
export const searchFlights = (from, to) => {
  return API.get(`/flights/?from=${from}&to=${to}`)
}

// Get available seats for a specific flight
export const getFlightSeats = (flightId) => {
  return API.get(`/flights/${flightId}/seats/`)
}

// ── Bookings ─────────────────────────────────────────────────────────────────

// Create a new booking with passenger details
export const createBooking = (bookingData) => {
  return API.post('/bookings/create/', bookingData)
}

// Get all bookings for a passenger by email
export const getBookingsByEmail = (email) => {
  return API.get(`/bookings/?email=${email}`)
}

// Cancel a booking by id
export const cancelBooking = (bookingId) => {
  return API.patch(`/bookings/${bookingId}/cancel/`)
}