import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axiosClient from '../../config/axiosClient'
import Loader from '../../components/Loader'

function AddPet() {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [color, setColor] = useState('')
    const [bio, setBio] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState(false)
    const [dietaryRestrictions, setDietaryRestrictions] = useState('')
    const [breed, setBreed] = useState('')
    const [picture, setPicture] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if ([name, type, height, weight, color, bio, dietaryRestrictions, breed].includes('')) {
            toast.error('Please fill out all fields')
            setIsLoading(false)
            return
        } else {
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
                const {data} = await axiosClient.post(`/pets`, {
                    name,
                    type,
                    height,
                    weight,
                    color,
                    bio,
                    hypoallergenic,
                    dietaryRestrictions,
                    breed,
                    picture
                }, config)

                toast.success(data.message)

                setIsLoading(false)
                setName('')
                setType('')
                setHeight('')
                setWeight('')
                setColor('')
                setBio('')
                setPicture('')
                setDietaryRestrictions('')
                setBreed('')
                setImage('')
            } catch (error) {
                toast.error(error)
                setIsLoading(false)
            }
        }
    }


    return (
        <div className="flex flex-col items-center pb-36">
            <h1 className="text-teal-800 font-black text-4xl">Add a new Pet Pal</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                onSubmit={handleSubmit}>

                <div className='flex flex-col md:flex-row justify-center items-center mb-4'>
                    <div className='mx-4'>
                        <label htmlFor="name" className='text-teal-800 font-bold mb-2 mx-2'>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter pet's name"
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ref={userRef}
                        />
                    </div>
                    <div className='mx-4'>
                        <label htmlFor="type" className='text-teal-800 font-bold mb-2 mx-2'>Type</label>
                        <input
                            type="text"
                            id="type"
                            placeholder="Enter pet's type"
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-center items-center mb-4'>
                    <div className='mx-4'>
                        <label htmlFor="breed" className='text-teal-800 font-bold mb-2 mx-2'>Breed</label>
                        <input
                            type="text"
                            id="breed"
                            placeholder="Enter pet's breed"
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                        />
                    </div>
                    <div className='mx-4'>
                        <label htmlFor="color" className='text-teal-800 font-bold mb-2 mx-2'>Color</label>
                        <input
                            type="text"
                            id="color"
                            placeholder="Enter pet's color"
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                    <div className='mx-4'>
                        <label htmlFor="height" className='text-teal-800 font-bold mb-2 mx-2'>Height</label>
                        <input
                            type="text"
                            id="height"
                            placeholder="Enter pet's height (cm)"
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className='mx-4'>
                        <label htmlFor="weight" className='text-teal-800 font-bold mb-2 mx-2'>Weight</label>
                        <input
                            type="text"
                            id="weight"
                            placeholder="Enter pet's weight (gr)"
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <label htmlFor="bio" className='text-teal-800 font-bold mb-2 mx-2'>Bio</label>
                <input
                    type="text"
                    id="bio"
                    placeholder="Enter pet's bio"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <label htmlFor="dietaryRestrictions" className='text-teal-800 font-bold mb-2 mx-2'>dietaryRestrictions</label>
                <input
                    type="text"
                    id="dietaryRestrictions"
                    placeholder="Enter pet's dietaryRestrictions"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                />

                <label htmlFor="picture" className='text-teal-800 font-bold mb-2 mx-2'>Picture</label>
                <input
                    type="text"
                    id="picture"
                    placeholder="Enter pet's dietaryRestrictions"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                />


                <div className='flex justify-center items-center my-2'>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                        <input type="checkbox" value={hypoallergenic} className="sr-only peer" onChange={(e) => setHypoallergenic(!hypoallergenic)} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span className="ml-3 text-md font-bold text-teal-800" >Hypoallergenic</span>
                    </label>
                </div>

                <div className='flex justify-center items-center'>
                    {isLoading
                        ? <Loader />
                        : <input type="submit"
                            value={'Add Pet'}
                            className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />}
                </div>
            </form>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default AddPet