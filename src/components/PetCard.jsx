import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import emptyHeart from '../assets/icons/heart-empty.png'
import fullHeart from '../assets/icons/heart-full.png'


function PetCard({ pet }) {

    const [isClick, setIsClick] = useState(false)

    const { auth } = useAuth()

    const { admin } = auth

    const { type, name, status, picture, _id } = pet

    const handleClick = () => {
        localStorage.setItem('petToEdit', JSON.stringify(pet))
    }

    useEffect(() => {
        async function getSavedPets() {
            const token = localStorage.getItem('petPalsToken')
            if (!token) {
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

                if (data.savedPets.includes(_id)) {
                    setIsClick(true)
                } else {
                    setIsClick(false)
                }
            } catch (error) {
                console.log(error.response.data.error)
            }
        }
        getSavedPets()
    }, [])

    async function handleSavePet() {
        setIsClick(!isClick)

        const token = localStorage.getItem('petPalsToken')
        if (!token) {
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            if (!isClick) {
                await axiosClient.put(`/pets/${_id}/save`, { savedBy: auth._id }, config)

                await axiosClient.put(`/users/${auth._id}/savePet`, { savedPet: _id }, config)

            } else {
                await axiosClient.put(`/pets/${_id}/unsave`, { unsavedBy: auth._id }, config)

                await axiosClient.put(`/users/${auth._id}/unsavePet`, { unsavedPet: _id }, config)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="border-solid border-teal-700 border-2 p-2 m-2 rounded-md min-w-60 flex flex-col items-center justify-center bg-white">

            <div className='w-full mb-2 flex  items-end justify-end'>
                {isClick ? <img onClick={handleSavePet} className='w-7 cursor-pointer' src={fullHeart} /> : <img className='w-7 cursor-pointer' onClick={handleSavePet} src={emptyHeart} />}
            </div>

            <div className='items-left'>
                <img src={picture} alt="pet picture" className="h-40 w-60 rounded-md" />
                <h2 className="text-teal-700 text-4xl">{name}</h2>
                <p className="text-teal-700 text-md">This is a: {type}</p>
                <p className="text-teal-700 text-md">This pet pal is currently:</p>
                <p className="text-teal-700 text-2xl uppercase">{status}</p>
            </div>


            <div className='flex flex-col md:flex-row justify-center items-center'>
                <Link to='/pet-page' className="my-4 w-4/5 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                    onClick={handleClick}
                >Know more</Link>
                {admin && <Link to='/admin/edit-pet' className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                    onClick={handleClick}
                >Edit pet</Link>}
            </div>

        </div>
    )
}

export default PetCard