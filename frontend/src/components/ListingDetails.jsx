import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Context Import
import { useListingContext } from '../hooks/useListingContext'

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
    const user_id = user ? user.name: null;

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
    // const handleSubmitEdit = async () => {
    //     const updatedListing = {
    //         listing_title: editTitle,
    //         shoe_size: editSize,
    //         location: editLocation,
    //         price: editPrice,
    //         condition: editCondition,
    //         description: editDescription,
    //         listing_img: editImage
    //     };
        
    //     try {
    //         if (editImage) {
    //         const formData = new FormData();
    //         formData.append('listing_img', editImage);

    //         for (const key in updatedListing) {
    //             formData.append(key, updatedListing[key]);
    //         }
    //         response = await axios.patch(`${baseURL}/api/listings/${listing._id}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //     } else {
    //         response = await axios.patch(`${baseURL}/api/listings/${listing._id}`, updatedListing);

    //         } if (response.status === 200) {
    //             dispatch({type: 'UPDATE_LISTING', payload: response.data});
    //             setIsEditing(false)
    //         }

    //     } catch (error) {
    //         console.log("Error updating listing", error);
            
    //     }
    // }
    const handleSubmitEdit = async () => {
        const updatedListing = {
            listing_title: editTitle,
            shoe_size: editSize,
            location: editLocation,
            price: editPrice,
            condition: editCondition,
            description: editDescription,
            listing_img: editImage
        };
    
        // Check if a new image file is selected before appending
        if (editImage) {
            updatedListing.append('listing_img', editImage);
        }
    
        try {
            const response = await axios.patch(`${baseURL}/api/listings/${listing._id}`, updatedListing, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
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
        setEditDescription(listing.description)
        setEditImage(listing.listing_img)
        setIsEditing(false);
    }

    return (
        <div className='listing-details'>
            {isEditing ? (
                <div className='edit-listing'>
                    <form className='edit-form'>
                        <h3>Edit Your Item</h3>

                        {/* Title */}
                        <div className='filter'>
                            <label>Edit Title:</label>
                            <input
                                type='text'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </div>

                        {/* Location */}
                        <div className='filter'>
                            <label>Edit Location:</label>
                            <input
                                type='text'
                                value={editLocation}
                                onChange={(e) => setEditLocation(e.target.value)}
                            />
                        </div>

                        {/* Size */}
                        <div className='filter'>
                            <label>Edit Size:</label>
                            <input
                                type='text'
                                value={editSize}
                                onChange={(e) => setEditSize(e.target.value)}
                            />
                        </div>

                        {/* Price */}
                        <div className='filter'>
                            <label>Edit Price:</label>
                            <input
                                type='text'
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </div>

                        {/* Condition */}
                        <div className='filter'>
                            <label>Edit Condition:</label>
                            <select type='text' value={editCondition} onChange={(e) => setEditCondition(e.target.value)}>
                            <option value='new'>New</option>
                            <option value='used_like_new'>Used - Like New</option>
                            <option value='used_good'>Used - Good</option>
                            <option value='used_fair'>Used - Fair</option>
                            </select>
                        </div>

                        {/* Image */}
                        <div className='filter'>
                            <label>Edit Image:</label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setEditImage(e.target.files[0])}
                            />
                        </div>

                        {/* Description */}
                        <div className='filter'>
                            <label>Edit Description:</label>
                            <input
                                type='text'
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </div>

                        <div className='edit-form-buttons'>
                            <div className='save-cancel-buttons'>
                                <button onClick={handleSubmitEdit}>Save Changes</button>
                                <button onClick={handleCancelEdit}>Cancel Changes</button>
                            </div>
                            <div className='delete-listing-button'>
                                <button onClick={handleDelete}>Delete Listing</button>
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
                                <h3 className='shoe-price'>{listing.price}</h3>
                                <div className='listing-card-info'>
                                    <div className='listing-card-details'>
                                        <h2>{listing.listing_title}</h2>
                                        <p>Size:{listing.shoe_size}</p>
                                        <p>{listing.description}</p>
                                        <p>{listing.location}</p>
                                    </div>
                                    <div className='listing-card-buttons'>
                                        <button className='view-button' onClick={handleNavigate}>view</button>
                                        <div className='edit-delete-button'>
                                            <button className='edit-button' onClick={handleEdit}>Edit</button>
                                            <button className='delete-button' onClick={handleDelete}>Delete</button>
                                        </div>
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