import React from "react";
import { Link } from "react-router-dom";
import "../home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Discover beautiful homes, apartments, and rooms for your next trip.</p>
          <Link to="/listings" className="btn-primary">
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="featured">
        <h2>Featured Properties</h2>
        <div className="property-grid">
          {[
            { id: 1, title: "Cozy Apartment in Mumbai", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd9kGl3tRP4NToluVBrGaXBBMooz8uRmF4cw&s", price: "₹3,500/night" },
            { id: 2, title: "Modern Flat in Delhi ", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzyz64m0Us1ZVCEeb7tWOvCS_S-kC7hiQFZA&s", price: "₹9,000/night" },
            { id: 3, title: "Luxury Villa in Goa", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUegEWgwn5RcXgRj-3CDTZzMSGmh2aIefChA&s", price: "₹5,000/night" },
            { id: 4, title: "Beach House in Kerala", img: "https://img.freepik.com/free-photo/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv_105762-2058.jpg?semt=ais_hybrid&w=740&q=80", price: "₹7,000/night" },
          ].map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.img} alt={property.title} />
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="price">{property.price}</p>
                <Link to="/listings" className="btn hero-btn">Explore Properties</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Have a property to rent?</h2>
        <p>List your property and start earning today!</p>
        <Link to="/add-listing" className="btn-primary">
          List Your Property
        </Link>
      </section>
    </div>
  );
};

export default Home;

