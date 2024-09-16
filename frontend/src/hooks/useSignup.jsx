import axios from "axios";
import { useState } from "react";
import {useAuthContext} from './useAuthContext'
const baseURL = import.meta.env.VITE_API_BASE_URL 

export const useSignup = () =>{
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (username, email, password) => {
        setIsLoading(true)
        setError(true)

        try {
            const response = await axios.post(`${baseURL}/api/user/signup`,
                { username, email, password }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status !== 200) {
                setIsLoading(false)
                setError(error.response.data.error)
            }
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({type: 'LOGIN', payload: response.data})
    
                setIsLoading(false)
            }
            
            console.log(response);
        } catch (error) {
            console.error(error.response.data.error);
            setError(error.response.data.error)
            setIsLoading(false)
        }
    }
    
    return {signup, isLoading, error}

}
