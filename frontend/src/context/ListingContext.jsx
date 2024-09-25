import axios from 'axios'
import { Children, createContext, useEffect, useReducer } from 'react'

export const ListingsContext = createContext()

const baseURL = import.meta.env.VITE_API_BASE_URL;

const listingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LISTINGS':
            return {
                listings: action.payload
            }
            case 'CREATE_LISTINGS':
                return {
                    listings: [action.payload, ...state.listings]
                }
            case 'DELETE_LISTING':
                return {
                    listings: state.listings.filter((listing) => listing._id !== action.payload._id)
                }
            case 'UPDATE_LISTING': {
                const updatedListing = action.payload;
                const updatedListings = state.listings.map(listing => {
                    if (listing._id === updatedListing._id) {
                        return updatedListing;
                    }

                    return listing;
                });

                return {
                    listings: updatedListings
                }
            }

            default:
                return state
    }
}

export const ListingsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(listingsReducer, {
        listings: []
    })

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/listings`);
                dispatch({type: 'SET_LISTINGS', payload: response.data})
            } catch (error) {
                console.log('Error fetching listings:', error);
            }
        };
        fetchListings();
     }, []);

    return (
        <ListingsContext.Provider value={({...state,dispatch})}>
            {children}
        </ListingsContext.Provider>
    )
}