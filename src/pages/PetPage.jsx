import useAuth from "../hooks/useAuth"
import axiosClient from "../config/axiosClient"
import { useState } from "react"
import Loader from "../components/Loader"
import { toast, ToastContainer } from 'react-toastify'
import Swal from "sweetalert2"

function PetPage() {

    const [isLoading, setIsLoading] = useState(false)

    const { auth } = useAuth()
    const userId = auth._id

    const pet = localStorage.getItem('petToEdit')
    const petInfo = JSON.parse(pet)

    const petId = petInfo._id

    const { type, name, status, bio, breed, color, dietaryRestrictions, height, weight, picture, hypoallergenic, ownerId, fostererId } = petInfo

    async function handleAdoption() {
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
            const dataPet = await axiosClient.put(`/pets/${petId}/status`, { status: 'adopted', ownerId: userId }, config)

            await axiosClient.put(`/users/${userId}/adoptPet`, { adoptedPet: petId }, config)

            localStorage.setItem('petToEdit', JSON.stringify(dataPet.data))

            toast.success('Pet adopted successfully!')

            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoading(false)
        }
    }

    async function handleFostering() {
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
            const dataPet = await axiosClient.put(`/pets/${petId}/status`, { status: 'fostered', fostererId: userId }, config)

            await axiosClient.put(`/users/${userId}/fosterPet`, { fosteredPet: petId }, config)

            localStorage.setItem('petToEdit', JSON.stringify(dataPet.data))

            toast.success('Pet fostered successfully!')

            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoading(false)
        }
    }

    function handleReturn() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to return your Pet Pal?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0E766E',
            cancelButtonColor: '#B91D1C',
            confirmButtonText: 'Yes, return it!'
        }).then(async (result) => {
                setIsLoading(true)
            if (result.isConfirmed) {
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

                    await axiosClient.put(`/pets/${petId}/return`, {  toBeReturned: true }, config)

                    Swal.fire(
                        'We understand.',
                        'An administrator will contact you soon to indicate the steps to follow.',
                        'success'
                    )

                    setIsLoading(false)

                } catch (error) {
                    toast.error(error.response.data.error)
                    setIsLoading(false)
                }

                
            }
        })
    }

    return (
        <div className="mt-28 pb-24 container mx-auto flex justify-center items-center gap-8 flex-col md:flex-row">

            <div className="ml-6 w-2/4">
                <img src={picture} alt="pet picture" className="rounded-md" />
            </div>
            <div className="w-2/4">
                <h2 className="text-teal-700 mb-2 text-6xl">{name}</h2>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">This is a:</span> {type}</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">This pet pal is currently:</span></p>
                <p className="text-teal-700 mb-2 text-2xl font-extrabold uppercase">{status}</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Breed:</span> {breed}</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Color:</span> {color}</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Height:</span> {height} cm</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Weight:</span> {weight} gr</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Dietary restrictions:</span> {dietaryRestrictions}</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Hypoallergenic:</span> {hypoallergenic ? 'Yes' : 'No'}</p>
                <p className="text-teal-700 mb-2 text-md">
                    <span className="font-bold">Bio:</span> {bio}</p>

                {userId &&
                    (status === 'available' ?
                        <div>
                            <button className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300" onClick={handleAdoption} >Adopt me!</button>
                            <button className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300" onClick={handleFostering}>Foster me!</button>
                        </div>
                        : (ownerId === userId || fostererId === userId)
                        && <div>
                            <button className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-red-700 text-white rounded-md px-4 py-2 hover:bg-red-800 hover:text-gray-300" onClick={handleReturn}>Return Pet</button>
                        </div>
                    )
                }

                {isLoading && <Loader />}

            </div>
            <ToastContainer autoClose={2000} />
        </div >

    )
}

export default PetPage