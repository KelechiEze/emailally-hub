import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingGrid from "./components/BookingGrid";
import BookingSummary from "./components/BookingSummary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingGrid />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
