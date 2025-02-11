import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
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
    confirmEmail: "",
  });

  const handleDateChange = (id, type, value) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, [type]: value } : booking
      )
    );
  };

  const calculateTotal = () => {
    return bookings.reduce((total, booking) => {
      if (!booking.startDate || !booking.endDate) return total;
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return total + days * booking.pricePerDay;
    }, 0);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const paymentConfig = {
    public_key: "FLWPUBK_TEST-d5ec3725cfa39a87b219099edd63ceb9-X",
    tx_ref: Date.now().toString(),
    amount: calculateTotal(),
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: formData.email,
      phone_number: "",
      name: `${formData.firstName} ${formData.lastName}`,
    },
    customizations: {
      title: "Office Space Booking",
      description: "Payment for selected office spaces",
      logo: "https://kelechieze.wordpress.com/wp-content/uploads/2024/11/images.jpg",
    },
    callback: (response) => {
      console.log("Payment response:", response);
      if (response.status === "successful") {
        navigate("/booking-summary", { state: response });
      }
      closePaymentModal();
    },
    onClose: () => console.log("Payment modal closed"),
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
              <td>₦{calculateTotal()}</td>
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

      {/* Pay Now Button */}
      <div className="next-button-container">
        <FlutterWaveButton {...paymentConfig} className="next-button">
          Pay Now
        </FlutterWaveButton>
      </div>
    </div>
  );
};

export default BookingSummary;
