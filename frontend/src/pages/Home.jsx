import { useEffect, useState } from "react";
import axios from 'axios'
import Listings from "./Listings";


const baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
    return (
      <div className="home-container">
        <div className="left-section">
          <h1>The Platypus shoe marketplace for Kiwis</h1>
          <div className="buttons">
            <button className="primary-button">Start browsing</button>
            <button className="primary-button">Create a listing</button>
          </div>
        </div>
        <div className="right-section">
          <div className="large-shoe">
            <img src="frontend\public\Adidas-shoe.png" alt="Adidas Shoe" />
          </div>
          <div className="small-shoes">
            <img src="frontend/public/Nike-shoe.png" alt="Nike Shoe" />
            <img src="frontend\public\Converse-shoe.png" alt="Converse Shoe" />
          </div>
        </div>
        <div className="filter-bar">
          <button className="filter nike">Nike Airforce</button>
          <button className="filter adidas">Adidas</button>
          <button className="filter reebok">Reebok</button>
          <button className="filter converse">Converse</button>
        </div>
        <Listings/>
      </div>
    );
  };

export default Home
