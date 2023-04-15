import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useAdmin = () => {
    const [error, setError] = useState(null)
    const [isloading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const admin = async (email, password) => {
        setIsLoading(true)
        setError(null)



        if(email === 'admin@gmail.com' && password === 'abcABC!123'){
        const response = await fetch('/carRental/admin/login', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({email, password})//body m jo pass kr rhe h use json m to change krna pdega na
        })
        const json = await response.json();//yha json se object mil rha h

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user in localstorage
            localStorage.setItem('user', JSON.stringify(json))
            navigate('/admin')
            //update the auth context
            dispatch({type: 'LOGIN', payload : json})//kyuki signup or login lgbhag same hote h

            setIsLoading(false)
            
        }
    }
    else{
        setError('You are not admin')
    }
    }

    return {admin, isloading, error}
}