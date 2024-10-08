import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import ChatSection from './ChatSection';

// icons
import { FaHeart } from "react-icons/fa6";

const baseURL = import.meta.env.VITE_API_BASE_URL

const SinglePageHeader = () => {

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [showComment, setShowComment] = useState(false);
    const commentSectionRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user.username : null;

    // listing
    useEffect(() => {
        axios.get(`${baseURL}/api/listings/${id}`)
        .then((res) => {
            setListing(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        });
    }, [id]);
    
    // comments
    useEffect(() => {
        if (showComment && commentSectionRef.current) {
            commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showComment]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (!listing) {
        return <div>Listing not found</div>
    }

    // buy now button
    const handleBuyNow = () => {
        setShowComment(true);
    };

    return (
        <>
            {/* Header */}
            <div className='singlepage-header-container'>
      
                {/* image */}
                <div className='single-listing-image'>
                  <img src={`${baseURL}/public/uploads/${listing.listing_img}`} alt={listing.listing_title}/>
                </div>

                {/* listing details */}
                <div className='single-listing-details-container'>
                    <h3 className='shoe-price'>${listing.price}</h3>
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
                                    <div className='profile-avatar'>
                                        <span>{listing.user_id.charAt(0).toUpperCase()}</span> 
                                    </div>
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
                                    <button className='primary-button buy-button' onClick={handleBuyNow}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showComment && (
                <div ref={commentSectionRef}>
                    <ChatSection />
                </div>
            )}
        </>
    )
}

export default SinglePageHeader