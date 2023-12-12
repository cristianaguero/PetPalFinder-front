import { useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
import Loader from "./Loader";
import { toast, ToastContainer } from 'react-toastify'

function SearchFormUser({ setUsers }) {

    const [input, setInput] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    async function getAllUsers() {
        setIsLoading(true)

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
            const { data } = await axiosClient.get('/users/users', config)
            setUsers(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error.response.data.error)
            setIsLoading(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

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
            const { data } = await axiosClient.get(`/users/search?query=${input}`, config)
            setUsers(data)
            setIsLoading(false)
            setInput('')
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    async function handleChange(e) {
        setInput(e.target.value)

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

        if (e.target.value.length > 2) {
            try {
                const { data } = await axiosClient.get(`/users/search?query=${e.target.value}`, config)
                setUsers(data)
            } catch (error) {
                console.log(error.response.data.error)
                toast.error(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        if (input === '') {
            getAllUsers()
        }
    }, [input])

    return (
        <div >
            <form className="flex flex-col md:flex-row justify-center items-center" onSubmit={handleSubmit}>
                <input type="text" className="border-solid border-2 border-teal-800 rounded-md px-2 py-1 md:mt-2 mb-2 outline-none mr-2 w-72 md:w-80"
                    placeholder="Search users"
                    value={input}
                    onChange={handleChange} />

                {isLoading 
                ? <Loader /> 
                : <input type="submit" value="Search" className="w-36 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300 " />}

            </form>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default SearchFormUser