import { useState, useEffect } from "react";
import axios from "axios";
import Listings from "./Listings";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [shoes, setShoes] = useState([]);  
  const [filteredShoes, setFilteredShoes] = useState([]); 
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    
    const fetchShoes = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/listings`); 
        setShoes(response.data);
        setFilteredShoes(response.data); 
      } catch (error) {
        console.error('Error fetching shoes:', error);
      }
    };

    fetchShoes();
  }, []);

  useEffect(() => {
    
    if (selectedBrand === 'All') {
      setFilteredShoes(shoes);
    } else {
      setFilteredShoes(shoes.filter(shoe => shoe.brand === selectedBrand));
    }
  }, [selectedBrand, shoes]);

  const handleShowAll = () => setSelectedBrand('All');
  const handleShowAdidas = () => setSelectedBrand('Adidas');
  const handleShowConverse = () => setSelectedBrand('Converse');
  const handleShowCrocs = () => setSelectedBrand('Crocs');
  const handleShowNike = () => setSelectedBrand('Nike');
  const handleShowPuma = () => setSelectedBrand('Puma');
  const handleShowNewBalance = () => setSelectedBrand('New Balance');
  const handleShowReebok = () => setSelectedBrand('Reebok');
  const handleShowTimberland = () => setSelectedBrand('Timberland');
  const handleShowUgg = () => setSelectedBrand('Ugg');
  const handleShowVans = () => setSelectedBrand('Vans');

  return (
    <>
      <div className="home-outer">
        <div className="home-container">
          <div className="Landing-section">
            <div className="large-shoe">
              <div className="Landing-text">
                <h1>The Platypus shoe <br /> marketplace for <br /> Kiwis</h1>
                <div className="buttons">
                  <button className="primary-button">Start browsing</button>
                </div>
              </div>
            </div>

            <div className="small-shoes">
              <img src="../public/Nike-shoe.png" alt="Nike Shoe" />
              <img src="../public/Converse-shoe.png" alt="Converse Shoe" />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <button className="filter" id="showAll" onClick={handleShowAll}>All</button>
            <button className="filter" id="adidas" onClick={handleShowAdidas}>Adidas</button>
            <button className="filter" id="converse" onClick={handleShowConverse}>Converse</button>
            <button className="filter" id="crocs" onClick={handleShowCrocs}>Crocs</button>
            <button className="filter" id="new-balance" onClick={handleShowNewBalance}>New Balance</button>
            <button className="filter" id="nike" onClick={handleShowNike}>Nike</button>
            <button className="filter" id="puma" onClick={handleShowPuma}>Puma</button>
            <button className="filter" id="reebok" onClick={handleShowReebok}>Reebok</button>
            <button className="filter" id="timberland" onClick={handleShowTimberland}>Timberland</button>
            <button className="filter" id="ugg" onClick={handleShowUgg}>Ugg</button>
            <button className="filter" id="vans" onClick={handleShowVans}>Vans</button>
          </div>
        </div>

        <Listings filteredShoes={filteredShoes} />
      </div>
    </>
  );
};

export default Home;
