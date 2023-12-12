import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify'
import axiosClient from "../config/axiosClient";
import Loader from "./Loader";

function SearchFormPet({ setFilteredPets, pets }) {

    const [input, setInput] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    
    async function handleSubmit(e) {
        e.preventDefault()
        setFilteredPets([])
        setIsLoading(true)

        try {
            const { data } = await axiosClient.get(`/pets/search?query=${input}`)
            setIsLoading(false)
            setFilteredPets(data)
            setInput('')
        } catch (error) {
            console.log(error.response.data.error)
            setIsLoading(false)
            toast.error(error.response.data.error)
        }
    }

    async function handleChange(e) {
        setInput(e.target.value)
        if (e.target.value.length > 2) {
            try {
                const { data } = await axiosClient.get(`/pets/search?query=${e.target.value}`)
                setFilteredPets(data)
            } catch (error) {
                console.log(error.response.data.error)
                toast.error(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        if (input === '') {
            setFilteredPets(pets)
        }
    }, [input])

    return (
        <div >
        <form className="flex flex-col md:flex-row justify-center items-center"
        onSubmit={handleSubmit}>
            <input type="text" className="border-solid border-2 border-teal-800 rounded-md px-2 py-1 md:mt-2 mb-2 outline-none mr-2 w-72 md:w-80"
                placeholder="Search Pet Pals"
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

export default SearchFormPet