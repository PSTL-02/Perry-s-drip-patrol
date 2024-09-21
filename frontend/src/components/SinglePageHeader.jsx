import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext';

// icons
import { IoHeartOutline } from "react-icons/io5";

const baseURL = import.meta.env.VITE_API_BASE_URL

const SinglePageHeader = () => {
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const { user } = useAuthContext();

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
                <div className='singlepage-header-grid-item single-listing-title'>
                    <div className='listing-title-icon'>
                        <h2>{listing.listing_title}</h2>
                        <IoHeartOutline/>
                    </div>
                    <div className='listing-seller-details'>
                        <div className='user-profile-picture'>
                            <img/>
                            <p>{user.username}</p>
                        </div>
                        <h6>Listed {formatDistanceToNow(new Date(listing.createdAt), {includeSeconds: false, addSuffix: true})}</h6>
                    </div>
                </div>
                <div className='singlepage-header-grid-item single-listing-details'>
                    <p>Size: {listing.shoe_size}</p>
                    <p>Condition: {listing.condition}</p>
                    <p>Location: {listing.location}</p>
                </div>
                <div className='singlepage-header-grid-item single-listing-price'>
                    <p>Asking price:</p>
                    <h3>${listing.price}</h3>
                </div>
                <div className='singlepage-header-grid-item single-listing-image'>
                    <img src={`${baseURL}/public/uploads/${listing.listing_img}`} alt={listing.listing_title}/>
                </div>
                <div className='singlepage-header-grid-item single-listing-button'>
                    <button className='primary-button buy-button'>Buy Now</button>
                </div>
            </div>

            {/* description */}
            <div className='single-listing-description-container'>
                <div className='single-listing-description'>
                    <p>Description:<br/><br/>{listing.description}</p>
                </div>
            </div>
        </>
    )
}

export default SinglePageHeader