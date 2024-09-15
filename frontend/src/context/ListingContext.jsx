import { Children, createContext, useReducer } from 'react'

export const ListingsContext = createContext()

const listingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LISTINGS':
            return {
                listings: action.payload
            }
            case 'CREATE_LISTINGS':
                return {
                    listings: [action.payload, ...state.projects]
                }
            case 'DELETE_LISTINGS':
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
        listings: null
    })

    return (
        <ListingsContext.Provider value={({...state,dispatch})}>
            {children}
        </ListingsContext.Provider>
    )
}