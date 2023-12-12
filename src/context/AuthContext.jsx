import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [auth, setAuth] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        async function authUser() {
            const token = localStorage.getItem('petPalsToken')

            if (!token) {
                setIsLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient.get('/users/profile', config)
                setAuth(data)
                navigate('/user')

            } catch (error) {
                console.log(error.response.data.error)
            }
            setIsLoading(false)
        }
        authUser()
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider }

export default AuthContext