import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingDetails from '../components/ListingDetails';
import ListingForm from '../components/ListingForm';
import { useListingContext } from '../hooks/useListingContext';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Home = ({showForm, setShowForm}) => {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { listings, dispatch } = useListingContext();
  const [myListings, setMyListings] = useState(false);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/listings`);
        setShoes(response.data);
        setFilteredShoes(response.data);
        dispatch({type: 'SET_LISTINGS', payload: response.data});
      } catch (error) {
        console.error('Error fetching shoes:', error);
      }
    };

    fetchShoes();
  }, [dispatch]);

  useEffect(() => {
    setFilteredShoes(selectedBrand === 'Shop All'
        ? listings
        : listings.filter(shoe => shoe.shoe_brand === selectedBrand));
  }, [selectedBrand, listings]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCloseFormModal = () => {
    setShowForm(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const getFilteredListings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user?.email || user?.username;

    let filtered = filteredShoes;

    if (myListings && user_id) {
      filtered = filtered.filter(listing => listing.user_id === user_id);
    }

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.listing_title.toLowerCase().includes(searchTerm) ||
        listing.location.toLowerCase().includes(searchTerm) ||
        listing.shoe_brand.toLowerCase().includes(searchTerm) ||
        listing.gender_category.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredListings = getFilteredListings();

  // return to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-outer">
      <div className="home-container">
        <div className='search-bar'>
           <input
            type='text'
            name='search'
            id='search'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            />
        </div>
        <div className="Landing-section">
          <div className="large-shoe">
            <div className="Landing-text">
              <h1>The Platypus shoe <br /> marketplace for <br /> Kiwis</h1>
              <h2>Where you can buy & sell shoes</h2>
              <div className="buttons">
                <button className="primary-button" onClick={() => window.scrollTo({ top: 652, behavior: "smooth" })} >Start browsing</button>
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
          <h2>Shop our range by brands:</h2>
          <div className='filter-button-wrapper'>
            {['Shop All', 'Adidas', 'Converse', 'Crocs', 'Jordan', 'New Balance', 'Nike', 'Puma', 'Reebok', 'Timberland', 'Ugg', 'Vans'].map(brand => (
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
          
        </div>

        <div className='listings-page'>
          {/* Create Listing Button */}
          {/* <div className='search-create-listing'>
            <div className='search-bar'>
              <input
                type='text'
                name='search'
                id='search'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button className='primary-button' onClick={handleCreateListing}>
              Create a listing
            </button>
          </div> */}

          {/* Form Modal */}
          {showForm && (
            <div className="modal">
              <div className="modal-content">
                <ListingForm closeMethod={handleCloseFormModal} />
              </div>
            </div>
          )}

          {/* Listings Display */}
          <div className='listings'>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <ListingDetails key={listing._id} listing={listing} />
              ))
            ) : (
              <p className='no-listing'>No listings available.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
