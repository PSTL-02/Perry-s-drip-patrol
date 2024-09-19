import { useState } from 'react'
import { useListingContext } from '../hooks/useListingContext'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const ListingForm = ({closeMethod}) => {
    const { dispatch } = useListingContext()

    const [title, setTitle] = useState('')
    const [brand, setBrand] = useState('')
    const [size, setSize] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const [listingImage, setListingImage] = useState(null)

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !brand || !size || !location || !price || !condition || !listingImage) {
            setError('* Please fill in all required fields.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData()
        formData.append('listing_title', title)
        formData.append('shoe_brand', brand)
        formData.append('shoe_size', size)
        formData.append('location', location)
        formData.append('price', price)
        formData.append('condition', condition)
        formData.append('description', description)
        formData.append('listing_img', listingImage)

        try {
            const response = await axios.post(`${baseURL}/api/listings`, formData);
            setTitle('')
            setBrand('')
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
        <div className='listing-form-box'>
            <form className='listing-form' onSubmit={handleSubmit}>
                <h3>Create Listing</h3>

                <div className='filter-form-container'>
                    {/* Title */}
                    <div className='form-filter'>
                        <label htmlFor="title">Title:<span>*</span></label>
                        <input
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>
                    
                    {/* Location */}
                    <div className='form-filter'>
                        <label htmlFor="location">Location:<span>*</span></label>
                        <input
                            type='text'
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            required
                        />
                    </div>

                    {/* Brand */}
                    <div className='form-filter'>
                        <label htmlFor="brand">Brand:<span>*</span></label>
                        <select type='text' onChange={(e) => setBrand(e.target.value)} value={brand} required>
                            <option value=''>Please Select shoe Brand</option>
                            <option value='Adidas'>Adidas</option>
                            <option value='Converse'>Converse</option>
                            <option value='Crocs'>Crocs</option>
                            <option value='New Balance'>New Balance</option>
                            <option value='Nike'>Nike</option>
                            <option value='Puma'>Puma</option>
                            <option value='Reebok'>Reebok</option>
                            <option value='Timberland'>Timberland</option>
                            <option value='Ugg'>Ugg</option>
                            <option value='Vans'>Vans</option>
                        </select>
                    </div>

                    {/* size */}
                    <div className='form-filter'>
                        <label htmlFor="size">Size:<span>*</span></label>
                        <div className='size-filter'>
                            <input
                                type='text'
                                onChange={(e) => setSize(e.target.value)}
                                value={size}
                                required
                            />
                            <select type='text' onChange={(e) => setSize(e.target.value)} value={size} required>
                                <option value='US'>US</option>
                                <option value='UK'>UK</option>
                                <option value='EURO'>EURO</option>
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div className='form-filter'>
                        <label htmlFor="price">Price:<span>*</span></label>
                        <input
                            type='text'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    {/* Condition */}
                    <div className='form-filter'>
                        <label htmlFor="condition">Condition:<span>*</span></label>
                        <select type='text' onChange={(e) => setCondition(e.target.value)} value={condition} required>
                            <option value=''>Please Select shoe condition</option>
                            <option value='new'>New</option>
                            <option value='used-like-new'>Used - Like New</option>
                            <option value='used-good'>Used - Good</option>
                            <option value='used-fair'>Used - Fair</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className='form-filter'>
                        <label htmlFor="description">Description:<span>*</span></label>
                        <input className='description'
                            type='text'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className='form-filter'>
                        <label htmlFor="image">Image:<span>*</span></label>
                        <input id='imageFilter'
                            type='file'
                            accept='image/*'
                            onChange={(e) => setListingImage(e.target.files[0])} required/>
                    </div>                    
                </div>

                <div className='form-buttons'>
                    <button className='cancel-button' type='button' onClick={() => closeMethod()}>Cancel</button>
                    <button className='post-button' type='submit'>Post Item</button>
                </div>

                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default ListingForm