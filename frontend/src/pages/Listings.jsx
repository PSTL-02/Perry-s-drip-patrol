import { useEffect, useState } from 'react';
import { useListingContext } from '../hooks/useListingContext';
import axios from 'axios';

import ListingDetails from '../components/ListingDetails';
import ListingForm from '../components/ListingForm';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Listings = ({ filteredShoes }) => { 
    const { listings, dispatch } = useListingContext();
    const [myListings, setMyListings] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/listings`);
                if (response.status === 200) {
                    dispatch({ type: 'SET_LISTINGS', payload: response.data });
                }
            } catch (error) {
                console.log("Error fetching listings:", error);
            }
        };

        fetchListings();
    }, [dispatch]);

    const handleMyListings = () => {
        setMyListings(true);
    };

    const handleAllListings = () => {
        setMyListings(false);
    };

    const handelCreateListing = () => {
        setShowForm(!showForm);
    };

    const getFilteredListings = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user?.email;
        

        if (myListings && user_id) {
            return listings.filter(listing => listing.user_id === user_id);
        }

        return filteredShoes || listings;
    };

    const filteredListings = getFilteredListings();

    return (
        <div className='listings-page'>
            <div className='create-listing-search'>
                <button className='primary-button' onClick={handelCreateListing}>Create a listing</button>
            </div>

            {showForm && <ListingForm />}

            <div className='listing-buttons'>
                <button id='allListings' onClick={handleAllListings}>All Listings</button>
                <button id='myListings' onClick={handleMyListings}>My Listings</button>
            </div>

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
    );
};

export default Listings;
