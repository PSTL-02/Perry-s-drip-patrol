import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
// icons
import { IoHeartOutline } from "react-icons/io5";

const baseURL = import.meta.env.VITE_API_BASE_URL

const SinglePageHeader = () => {

    const [SingleListing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

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

    if (loading) {
        return <div>Loading...</div>
    }

    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <>
            {/* Header */}
            <div className='singlepage-header-container'>
                <div className='singlepage-header-grid-item single-listing-title'>
                    <h2></h2>
                    <IoHeartOutline/>
                    <div className='user-profile-picture'>
                        <img/>
                        <p></p>
                    </div>
                    <h6>Listed {formatDistanceToNow(new Date(listing.createdAt), {includeSeconds: false, addSuffix: true})}</h6>
                </div>
                <div className='singlepage-header-grid-item single-listing-details'>
                    <p>Size: </p>
                    <p>Condition: </p>
                    <p>Location: </p>
                </div>
                <div className='singlepage-header-grid-item single-listing-price'>
                    <p>Asking price:</p>
                    <h3>$</h3>
                </div>
                <div className='singlepage-header-grid-item single-listing-image'>
                    <img/>
                </div>
                <button className='primary-button'>Buy Now</button>
            </div>

            {/* description */}
            <div className='single-listing-description'>
                <p>Description</p>
            </div>
        </>
    )
}

export default SinglePageHeader