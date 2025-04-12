import axios from './axios-customize';

/**
 * Create a new booking
 * @param {Object} data - Booking data
 * @param {number} data.userId - User ID
 * @param {number} data.roomId - Room ID
 * @param {string} data.checkInDate - Check-in date in YYYY-MM-DD format
 * @param {string} data.checkOutDate - Check-out date in YYYY-MM-DD format
 * @param {string} data.phoneNumber - Contact phone number
 * @param {string} data.specialRequests - Special requests (optional)
 */
export const callCreateBooking = (data) => {
    const params = new URLSearchParams({
        userId: data.userId,
        roomId: data.roomId,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        phoneNumber: data.phoneNumber,
        ...(data.specialRequests && { specialRequests: data.specialRequests })
    });
    return axios.post(`/bookings?${params.toString()}`);
};

/**
 * Get all bookings with filtering options
 * @param {Object} options - Filter options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.size - Page size (default: 10)
 * @param {string} options.status - Booking status (optional)
 * @param {string} options.fromDate - Start date in YYYY-MM-DD format (optional)
 * @param {string} options.toDate - End date in YYYY-MM-DD format (optional)
 */
export const callGetAllBookings = (options = {}) => {
    const params = new URLSearchParams({
        page: options.page || 1,
        size: options.size || 10,
        ...(options.status && { status: options.status }),
        ...(options.fromDate && { fromDate: options.fromDate }),
        ...(options.toDate && { toDate: options.toDate })
    });
    return axios.get(`/bookings?${params.toString()}`);
};

/**
 * Get bookings for a specific user
 * @param {number} userId - User ID
 */
export const callGetUserBookings = (userId) => {
    return axios.get(`/bookings/user/${userId}`);
};

/**
 * Get a specific booking by ID
 * @param {number} bookingId - Booking ID
 */
export const callGetBooking = (bookingId) => {
    return axios.get(`/bookings/${bookingId}`);
};

/**
 * Update booking status
 * @param {number} bookingId - Booking ID
 * @param {string} status - New booking status
 */
export const callUpdateBookingStatus = (bookingId, status) => {
    return axios.put(`/bookings/${bookingId}/status?status=${status}`);
};

/**
 * Cancel a booking
 * @param {number} bookingId - Booking ID
 */
export const callCancelBooking = (bookingId) => {
    return axios.delete(`/bookings/${bookingId}`);
}; 