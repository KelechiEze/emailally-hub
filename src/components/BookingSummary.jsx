import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaTrash, FaRedo } from "react-icons/fa"; // Import FA icons
import "./BookingSummary.css";

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigation
  const selectedBooking = Array.isArray(location.state) ? location.state : [location.state]; // Ensure it's an array

  const [bookings, setBookings] = useState(
    selectedBooking.map((booking) => ({
      ...booking,
      startDate: "",
      endDate: "",
    }))
  );

  const handleDateChange = (id, type, value) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, [type]: value } : booking
      )
    );
  };

  const calculateTotal = (startDate, endDate, pricePerDay) => {
    if (!startDate || !endDate) return "₦0";

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate number of days (Ensure at least 1 day is counted)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    return `₦${days * pricePerDay}`;
  };

  // Handle deleting a booking
  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  // Handle refreshing dates (reset start & end dates)
  const handleRefresh = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, startDate: "", endDate: "" } : booking
      )
    );
  };

  // Handle Next button click
  const handleNext = () => {
    navigate("/payment", { state: { bookings } }); // Navigate to the payment page with booking details
  };

  return (
    <div className="booking-summary">
      <table>
        <thead>
          <tr>
            <th>OFFICE SPACE</th>
            <th>START DATE</th>
            <th>END DATE</th>
            <th>TOTAL PRICE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="office-info">
                <img src={booking.image} alt={booking.name} className="office-image" />
                {booking.name}
              </td>
              <td>
                <input
                  type="date"
                  value={booking.startDate}
                  onChange={(e) => handleDateChange(booking.id, "startDate", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={booking.endDate}
                  onChange={(e) => handleDateChange(booking.id, "endDate", e.target.value)}
                />
              </td>
              <td>{calculateTotal(booking.startDate, booking.endDate, booking.pricePerDay)}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(booking.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Next Button */}
      <div className="next-button-container">
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BookingSummary;
