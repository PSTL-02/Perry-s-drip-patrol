import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingDetails from '../components/ListingDetails';
import ListingForm from '../components/ListingForm';
import { useListingContext } from '../hooks/useListingContext';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  
  const { listings, dispatch } = useListingContext();
  const [myListings, setMyListings] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
    const filtered = selectedBrand === 'All'
      ? shoes
      : shoes.filter(shoe => shoe.shoe_brand && shoe.shoe_brand === selectedBrand);
    console.log(filtered)
    setFilteredShoes(filtered);
  }, [selectedBrand, shoes]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCreateListing = () => {
    setShowForm(!showForm);
  };

  const getFilteredListings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user?.email || user?.username;

    let filtered = filteredShoes;

    if (myListings && user_id) {
      filtered = filtered.filter(listing => listing.user_id === user_id);
    }

    return filtered;
  };

  const filteredListings = getFilteredListings();

  return (
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
          {['All', 'Adidas', 'Converse', 'Crocs', 'New Balance', 'Nike', 'Puma', 'Reebok', 'Timberland', 'Ugg', 'Vans'].map(brand => (
            <button 
              key={brand}
              className={`filter ${selectedBrand === brand ? 'active' : ''}`} 
              id={brand.toLowerCase().replace(' ', '-')}
              onClick={() => handleBrandChange(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className='listings-page'>
          {/* Create Listing Button */}
          <div className='create-listing-search'>
            <button className='primary-button' onClick={handleCreateListing}>
              Create a listing
            </button>
          </div>

          {showForm && <ListingForm closeMethod={() => setShowForm(false)} />}

          {/* Listings Display */}
          <div className='listings'>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <ListingDetails key={listing._id} listing={listing} />
              ))
            ) : (
              <p>No listings available.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
