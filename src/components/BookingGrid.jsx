import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingGrid.css";
import arcImage from "../assets/privateoffice.png";
import notreDameImage from "../assets/sharedcowork.jpeg";
import versaillesImage from "../assets/pace.jpg";
import pompidueImage from "../assets/conferenceroom.jpg";

const officeSpaces = [
  {
    id: 1,
    name: "PRIVATE OFFICE",
    category: "private space",
    pricePerDay: 50000,
    rating: 3.5,
    reviews: 23,
    tag: "Popular",
    image: arcImage,
  },
  {
    id: 2,
    name: "SHARED CO-WORK SPACE",
    category: "shared space",
    pricePerDay: 12000,
    rating: 4,
    reviews: 23,
    tag: "Top Rated",
    image: notreDameImage,
  },
  {
    id: 3,
    name: "OFFICE SPACE",
    category: "office space",
    pricePerDay: 12000,
    rating: 3,
    reviews: 23,
    tag: "Popular",
    image: versaillesImage,
  },
  {
    id: 4,
    name: "CONFERENCE ROOM",
    category: "conference room",
    pricePerDay: 200000,
    rating: 3.5,
    reviews: 23,
    tag: "Popular",
    image: pompidueImage,
  },
];

const BookingGrid = () => {
  const navigate = useNavigate();

  const handleBooking = (space) => {
    navigate("/booking-summary", { state: space });
  };

  return (
    <div className="booking-container">
      {/* Added H2 Heading */}
      <h2 className="booking-heading">
        BOOK <span className="purple-text">YOUR</span> SPACE
      </h2>

      <div className="booking-grid">
        {officeSpaces.map((space) => (
          <div key={space.id} className="booking-card">
            <div className={`tag ${space.tag === "Top Rated" ? "green" : "red"}`}>
              {space.tag}
            </div>
            <img src={space.image} alt={space.name} className="booking-image" />
            <div className="booking-details">
              <p className="category">{space.category}</p>
              <h3 className="title">{space.name}</h3>
              <div className="ratings">
                <span className="stars">
                  {"★".repeat(Math.floor(space.rating))}
                  {"☆".repeat(5 - Math.floor(space.rating))}
                </span>
                <span className="reviews">({space.reviews})</span>
              </div>
              <div className="footer">
                <span className="price">₦{space.pricePerDay}/day</span>
                <button className="book-button" onClick={() => handleBooking(space)}>
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingGrid;
