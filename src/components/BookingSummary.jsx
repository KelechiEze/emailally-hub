import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./BookingSummary.css";

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBooking = Array.isArray(location.state) ? location.state : [location.state];

  const [bookings, setBookings] = useState(
    selectedBooking.map((booking) => ({
      ...booking,
      startDate: "",
      endDate: "",
    }))
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: ""
  });

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
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return `₦${days * pricePerDay}`;
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    const dataToSend = { bookings, userDetails: formData };
    try {
      await fetch("YOUR_GOOGLE_SHEET_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      navigate("/payment", { state: dataToSend });
    } catch (error) {
      console.error("Error sending data to spreadsheet:", error);
    }
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
                <input type="date" value={booking.startDate} onChange={(e) => handleDateChange(booking.id, "startDate", e.target.value)} />
              </td>
              <td>
                <input type="date" value={booking.endDate} onChange={(e) => handleDateChange(booking.id, "endDate", e.target.value)} />
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

      {/* User Details Form */}
      <div className="user-details">
        <h2>Your Details</h2>
        <p>Please fill in the form below.</p>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Confirm Email</label>
            <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="next-button-container">
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BookingSummary;