import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext';

// icons
import { FaHeart } from "react-icons/fa6";

const baseURL = import.meta.env.VITE_API_BASE_URL

const SinglePageHeader = () => {
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user.username : null;

    useEffect(() => {
        axios.get(`${baseURL}/api/listings/${id}`)
        .then((res) => {
            console.log(res.data);
            setListing(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (!listing) {
        return <div>Listing not found</div>
    }

    return (
        <>
            {/* Header */}
            <div className='singlepage-header-container'>
                {/* image */}
                <div className='single-listing-image'>
                    <img src={`${baseURL}/public/uploads/${listing.listing_img}`} alt={listing.listing_title}/>
                    <h3 className='shoe-price'>${listing.price}</h3>
                </div>

                {/* listing details */}
                <div className='single-listing-details-container'>
                    <div className='single-listing-title'>
                        {/* title */}
                        <div className='listing-title-icon'>
                            <h2>{listing.listing_title}</h2>
                        </div>
                        {/* desc */}
                        <div className='single-listing-description'>
                            <h4>Description:</h4>
                            <p>{listing.description}</p>
                        </div>

                        {/* listing category tags */}
                        <div className='listing-categories'>
                            <div className='single-listing-details-category'>
                                <h4>Size:</h4>
                                <p>{listing.shoe_size} {listing.country_size}</p>
                            </div>
                            <div className='single-listing-details-category'>
                                <h4>Brand: </h4>
                                <p>{listing.shoe_brand}</p>
                            </div>
                            <div className='single-listing-details-category'>
                                <h4>Category: </h4>
                                <p>{listing.gender_category}</p>
                            </div>
                            <div className='single-listing-details-category'>
                                <h4>Condition: </h4>
                                <p>{listing.condition}</p>
                            </div>
                            <div className='single-listing-details-category'>
                                <h4>Location: </h4>
                                <p>{listing.location}</p>
                            </div>
                        </div>

                        <div className='listing-profile-buttons'>
                            {/* listing seller */}
                            <div className='listing-seller-details'>
                                <div className='user-profile-picture'>
                                    <img/>
                                    <p>{listing.user_id}</p>
                                </div>
                                <h5>Listed {formatDistanceToNow(new Date(listing.createdAt), {includeSeconds: false, addSuffix: true})}</h5>
                            </div>

                            {/* buttons */}
                            <div className='listing-buttons-container'>
                                <div className='single-listing-button'>
                                    <button className='primary-button buy-button'><FaHeart/> I like this</button>
                                </div>
                                {/* buy button */}
                                <div className='single-listing-button'>
                                    <button className='primary-button buy-button'>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePageHeader