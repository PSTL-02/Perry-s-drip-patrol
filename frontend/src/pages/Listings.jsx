import { useEffect, useState } from 'react'
import { useListingContext } from '../hooks/useListingContext'
import axios from 'axios'

import ListingDetails from '../components/ListingDetails'
import ListingForm from '../components/ListingForm'

const baseURL = import.meta.env.VITE_API_BASE_URL

const Listings = () => {
    const {listings, dispatch} = useListingContext()
    const [myListings, setMyListings] = useState(null)

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/listings`)
                if (response.status === 200) {
                    dispatch({type: 'SET_LISTINGS', payload: response.data})
                }
            } catch (error) {
                console.log("Error fetching listings:", error);
            }
        }

        fetchListings();
    }, []);

    // useEffect(() => {
    //     if(listings) {
    //         const filteredData = listings.filter((listing) => {
    //             return listing.user_id.toLowerCase()
    //         })
    //         setFilteredListings(filteredData)
    //     }
    // }, [listings])

    const handleMyListings = ( )=> {
        setMyListings(true)
    }

    const handleAllListings = ( )=> {
        setMyListings(null)
    }

    return (
        <div className='listings-page'>
            <div className='listing-buttons'>
                    <button onClick={handleAllListings}>All Listings</button>
                    <button onClick={handleMyListings}>My Listings</button>
                </div>
            <div className='listings'>
                {myListings ? (listings && listings.map((listing) => {
                    const user = JSON.parse(localStorage.getItem('user'))
                    const user_id = user.email
                    if (listing.user_id === user_id) {
                        return (
                            <ListingDetails key={listing._id} listing={listing}/>
                        )
                    }
                })) : (listings && listings.map((listing) => {
                    return (
                        <ListingDetails key={listing._id} listing={listing}/>
                    )
                }))
                }
            </div>
            <ListingForm/>
        </div>
    )
}

export default Listings