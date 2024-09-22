import { useState } from 'react'
import { useListingContext } from '../hooks/useListingContext'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const ListingForm = ({closeMethod}) => {
    const { dispatch } = useListingContext()

    const [title, setTitle] = useState('')
    const [size, setSize] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const [listingImage, setListingImage] = useState(null)

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !size || !location || !price || !condition || !listingImage) {
            setError('* Please fill in all required fields.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user.username;

        const formData = new FormData()
        formData.append('listing_title', title)
        formData.append('shoe_size', size)
        formData.append('location', location)
        formData.append('price', price)
        formData.append('condition', condition)
        formData.append('description', description)
        formData.append('listing_img', listingImage)
        formData.append('user_id', user_id)

        try {
            const response = await axios.post(`${baseURL}/api/listings`, formData);
            setTitle('')
            setSize('')
            setLocation('')
            setPrice('')
            setCondition('')
            setDescription('')
            setListingImage(null)

            setError(null)

            dispatch({type: 'CREATE_LISTINGS', payload: response.data})

            if (typeof closeMethod === 'function') {
                closeMethod()
            }

        } catch (error) {
            setError('An error occurred when posting the listing. Please try again.')
        }
    }

    return (
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <h3>Create Listing</h3>

                {/* Title */}
                <div className='filter'>
                    <label htmlFor="title">Title:<span>*</span></label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                
                {/* Location */}
                <div className='filter'>
                    <label htmlFor="location">Location:<span>*</span></label>
                    <input
                        type='text'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        required
                    />
                </div>

                {/* size */}
                <div className='filter'>
                    <label htmlFor="size">Size:<span>*</span></label>
                    <input
                        type='text'
                        onChange={(e) => setSize(e.target.value)}
                        value={size}
                        required
                    />
                </div>

                {/* Price */}
                <div className='filter'>
                    <label htmlFor="price">Price:<span>*</span></label>
                    <input
                        type='text'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                    />
                </div>

                {/* Condition */}
                <div className='filter'>
                    <label htmlFor="condition">Condition:<span>*</span></label>
                    <select type='text' onChange={(e) => setCondition(e.target.value)} value={condition} required>
                        <option value=''>Please Select shoe condition</option>
                        <option value='new'>New</option>
                        <option value='used_like_new'>Used - Like New</option>
                        <option value='used_good'>Used - Good</option>
                        <option value='used_fair'>Used - Fair</option>
                    </select>
                </div>

                {/* Image */}
                <div className='filter'>
                    <label htmlFor="image">Image:<span>*</span></label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => setListingImage(e.target.files[0])} required/>
                </div>

                {/* Description */}
                <div className='filter'>
                    <label htmlFor="description">Description:<span>*</span></label>
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                </div>

                <button type='button' onClick={() => closeMethod()}>Cancel</button>
                <button type='submit'>Post Item</button>

                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default ListingForm