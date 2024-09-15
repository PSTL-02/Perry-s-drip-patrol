import { ListingsContext } from "../context/ListingContext"
import {useContext} from 'react'

export const useListingContext = () => {
    const context = useContext(ListingsContext)

    if(!context) {
        throw Error('useListingContext hook must be used inside ListingsContextProvider')
    }

    return context
}