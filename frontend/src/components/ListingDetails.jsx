import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Context Import
import { useListingContext } from '../hooks/useListingContext'

// Icon Import
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL

const ListingDetails = ({listing}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(listing.listing_title);
    const [editSize, setEditSize] = useState(listing.shoe_size);
    const [editLocation, setEditLocation] = useState(listing.location);
    const [editPrice, setEditPrice] = useState(listing.price);
    const [editCondition, setEditCondition] = useState(listing.condition);
    const [editDescription, setEditDescription] = useState(listing.description);
    const [editImage, setEditImage] = useState(null);

    const { dispatch } = useListingContext();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user._id : null;

    // Handle Navigate
    const handleNavigate = () => {
        let path = `/${listing._id}`;
        navigate(path);
    };

    // Handle Delete
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${baseURL}/api/listings/${listing._id}`)
            const json = await response.data
            if(response.status === 200) {
                dispatch({type: 'DELETE_LISTING', payload: json})
            }
        } catch (error) {
            console.log('Error deleting listing', error);
        }
    };

    // Handle Edit
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Handle Submit Edit
    const handleSubmitEdit = async () => {
        const updatedListing = {
            listing_title: editTitle,
            shoe_size: editSize,
            location: editLocation,
            price: editPrice,
            condition: editCondition,
        };
    
        try {
            const response = await axios.patch(`${baseURL}/api/listings/${listing._id}`,
                updatedListing
            );

            // const updatedData = response.data;
            
            if (response.status === 200) {
                dispatch({ type: 'UPDATE_LISTING', payload: response.data });
                setIsEditing(false);
            }
    
        } catch (error) {
            console.log("Error updating listing", error);
        }
    };
    

    // Handle Cancel edit
    const handleCancelEdit = () => {
        setEditTitle(listing.listing_title)
        setEditSize(listing.shoe_size)
        setEditLocation(listing.location)
        setEditPrice(listing.price)
        setEditCondition(listing.condition)
        setIsEditing(false);
    }

    return (
        <div className='listing-details'>
            {isEditing ? (
                <div className='edit-listing'>
                    <form className='edit-form'>
                        <h3>Edit Your Item</h3>

                        <div className='filter-form-container'>
                            {/* Title */}
                            <div className='edit-filter'>
                                <label>Title:</label>
                                <input
                                    type='text'
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </div>

                            {/* Location */}
                            <div className='edit-filter'>
                                <label>Location:</label>
                                <input
                                    type='text'
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                />
                            </div>

                            {/* Size */}
                            <div className='edit-filter'>
                                <label>Size:</label>
                                <input
                                    type='text'
                                    value={editSize}
                                    onChange={(e) => setEditSize(e.target.value)}
                                />
                            </div>

                            {/* Price */}
                            <div className='edit-filter'>
                                <label>Price:</label>
                                <input
                                    type='text'
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                />
                            </div>

                            {/* Condition */}
                            <div className='edit-filter'>
                                <label>Condition:</label>
                                <select type='text' value={editCondition} onChange={(e) => setEditCondition(e.target.value)}>
                                <option value='new'>New</option>
                                <option value='used_like_new'>Used - Like New</option>
                                <option value='used_good'>Used - Good</option>
                                <option value='used_fair'>Used - Fair</option>
                                </select>
                            </div>
                        </div>

                        <div className='edit-form-buttons'>
                            <div className='save-cancel-buttons'>
                                <button className='save-button' onClick={handleSubmitEdit}>Save Changes</button>
                                <button className='cancel-button' onClick={handleCancelEdit}>Cancel Changes</button>
                            </div>
                            <div className='delete-listing-button'>
                                <button className='delete-button' onClick={handleDelete}>Delete Listing</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
                )
                : // If not editing
                (
                    <>
                        <div className='listing-card-border'>
                            <div className='listing-card'>
                                <div className='listing-image'>
                                    <img src={`${baseURL}/public/uploads/${listing.listing_img}`} alt="Listing" />
                                </div>
                                <div className='listing-card-info'>
                                    <div className='listing-card-details'>
                                        <h3 className='shoe-price'>{listing.price}</h3>
                                        <h2>{listing.listing_title}</h2>
                                        <p>Size:{listing.shoe_size}</p>
                                        <p>{listing.location}</p>
                                    </div>

                                    <div className='listing-card-buttons'>
                                        <button className='view-button' onClick={handleNavigate}>view</button>
                                        {listing.user_id === user_id && (
                                            <>
                                                <div className='edit-delete-button'>
                                                    <FaEdit className='edit-icon'onClick={handleEdit}/>
                                                    <FaRegTrashAlt className='delete-icon'onClick={handleDelete}/>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ListingDetails