import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../config/axiosClient'
import Loader from '../../components/Loader'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function EditPet() {

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    const navigate = useNavigate()

    let petLocalStorage = localStorage.getItem('petToEdit')
    petLocalStorage = JSON.parse(petLocalStorage)

    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [color, setColor] = useState('')
    const [dietaryRestrictions, setDietaryRestrictions] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState(false)
    const [bio, setBio] = useState('')
    const [picture, setPicture] = useState('')
    const [status, setStatus] = useState('')
    const [ownerId, setOwnerId] = useState('')
    const [fostererId, setFostererId] = useState('')

    const [namePlaceholder, setNamePlaceholder] = useState('')
    const [typePlaceholder, setTypePlaceholder] = useState('')
    const [breedPlaceholder, setBreedPlaceholder] = useState('')
    const [colorPlaceholder, setColorPlaceholder] = useState('')
    const [dietaryRestrictionsPlaceholder, setDietaryRestrictionsPlaceholder] = useState('')
    const [heightPlaceholder, setHeightPlaceholder] = useState('')
    const [weightPlaceholder, setWeightPlaceholder] = useState('')
    const [bioPlaceholder, setBioPlaceholder] = useState('')
    const [picturePlaceholder, setPicturePlaceholder] = useState('')
    const [ownerIdPlaceholder, setOwnerIdPlaceholder] = useState('')
    const [fostererIdPlaceholder, setFostererIdPlaceholder] = useState('')

    useEffect(() => {
        function populatePet() {
            const { name, type, breed, color, dietaryRestrictions, height, weight, hypoallergenic, bio, picture, status, ownerId, fostererId } = petLocalStorage

            setNamePlaceholder(name)
            setTypePlaceholder(type)
            setBreedPlaceholder(breed)
            setColorPlaceholder(color)
            setDietaryRestrictionsPlaceholder(dietaryRestrictions)
            setHeightPlaceholder(height)
            setWeightPlaceholder(weight)
            setHypoallergenic(hypoallergenic)
            setBioPlaceholder(bio)
            setPicturePlaceholder(picture)
            setStatus(status)
            setOwnerIdPlaceholder(ownerId)
            setFostererIdPlaceholder(fostererId)
        }
        populatePet()
    }, [])

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

        const body = {
            name,
            type,
            breed,
            color,
            dietaryRestrictions,
            height,
            weight,
            hypoallergenic,
            bio,
            picture,
            status,
            ownerId
        }

        const _id = petLocalStorage._id

        try {
            const data = await axiosClient.put(`/pets/update-pet/${_id}`, body, config)

            setIsLoading(false)
            toast.success('Pet updated successfully')

            setName('')
            setType('')
            setBreed('')
            setColor('')
            setDietaryRestrictions('')
            setHeight('')
            setWeight('')
            setBio('')
            setPicture('')
            setStatus('')
            setOwnerId('')
            setFostererId('')

            setNamePlaceholder(data.data.name)
            setTypePlaceholder(data.data.type)
            setBreedPlaceholder(data.data.breed)
            setColorPlaceholder(data.data.color)
            setDietaryRestrictionsPlaceholder(data.data.dietaryRestrictions)
            setHeightPlaceholder(data.data.height)
            setWeightPlaceholder(data.data.weight)
            setHypoallergenic(data.data.hypoallergenic)
            setStatus(data.data.status)
            setBioPlaceholder(data.data.bio)
            setPicturePlaceholder(data.data.picture)
            setOwnerIdPlaceholder(data.data.ownerId)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error('Error updating pet')
        }
    }

    function handleDelete() {
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

        const _id = petLocalStorage._id

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0E766E',
            cancelButtonColor: '#B91D1C',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const { data } = await axiosClient.delete(`/pets/delete-pet/${_id}`, config)

                    toast.success(data.message)
                    setIsLoading(false)

                    localStorage.removeItem('petToEdit')
                    navigate('/admin/search-pet')

                } catch (error) {
                    toast.error(error.response.data.error)
                    toast.error(error.message)
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
            }
        })
    }

    function handleReturn() {
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

        const userId = petLocalStorage.ownerId || petLocalStorage.fostererId
        const petId = petLocalStorage._id

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0E766E',
            cancelButtonColor: '#B91D1C',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {

                    const dataPet = await axiosClient.put(`/pets/${petId}/status`, { status: 'available', ownerId: null, fostererId: null, toBeReturned: false }, config)

                    await axiosClient.put(`/users/${userId}/returnPet`, { petId }, config)

                    localStorage.setItem('petToEdit', JSON.stringify(dataPet.data))

                    toast.success('Pet returned successfully!')

                    setIsLoading(false)
                } catch (error) {
                    toast.error(error.response.data.error)
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
            }
        })
    }

    async function handleIgnoreReturn() {
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

        const userId = petLocalStorage.ownerId || petLocalStorage.fostererId
        const petId = petLocalStorage._id

        try {

            const dataPet = await axiosClient.put(`/pets/${petId}/status`, { toBeReturned: false }, config)

            localStorage.setItem('petToEdit', JSON.stringify(dataPet.data))

            toast.success('Pet stays with owner!')

            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoading(false)
        }

    }


    return (
        <div className="flex flex-col items-center pb-36">
            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row justify-center items-center mb-4'>
                    <div className='mx-4'>
                        <label htmlFor="name" className='text-teal-800 font-bold mb-2 mx-2'>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder={namePlaceholder}
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
                            placeholder={typePlaceholder}
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
                            placeholder={breedPlaceholder}
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
                            placeholder={colorPlaceholder}
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
                            placeholder={heightPlaceholder}
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
                            placeholder={weightPlaceholder}
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
                    placeholder={bioPlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <label htmlFor="dietaryRestrictions" className='text-teal-800 font-bold mb-2 mx-2'>dietaryRestrictions</label>
                <input
                    type="text"
                    id="dietaryRestrictions"
                    placeholder={dietaryRestrictionsPlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                />

                <label htmlFor="picture" className='text-teal-800 font-bold mb-2 mx-2'>Picture</label>
                <input
                    type="text"
                    id="picture"
                    placeholder={picturePlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                />

                <label htmlFor="ownerId" className='text-teal-800 font-bold mb-2 mx-2'>Owner ID</label>
                <input
                    type="text"
                    name="ownerId"
                    placeholder={ownerIdPlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
                />

                <label htmlFor="ownerId" className='text-teal-800 font-bold mb-2 mx-2'>Fosterer ID</label>
                <input
                    type="text"
                    name="ownerId"
                    placeholder={fostererIdPlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={fostererId}
                    onChange={(e) => setFostererId(e.target.value)}
                />

                <div className="flex flex-col md:flex-row justify-center items-center my-4">
                    <div className="flex justify-center items-center mx-2">
                        <label htmlFor="status" className="text-teal-800 font-bold text-lg mb-2 mr-2">Status</label>
                        <select id="status" name="status" className="border-solid border-2 border-teal-700 rounded-md p-1 outline-none" onChange={e => setStatus(e.target.value)} value={status} >
                            <option value="available">Available</option>
                            <option value="fostered">Fostered</option>
                            <option value="adopted">Adopted</option>
                        </select>
                    </div>
                    <div className='ml-4 flex justify-center items-center my-2'>
                        <label className="relative inline-flex items-center mr-5 cursor-pointer">
                            <input type="checkbox" className="sr-only peer" onChange={() => setHypoallergenic(!hypoallergenic)} checked={hypoallergenic} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            <span className="ml-3 text-md font-bold text-teal-800" >Hypoallergenic</span>
                        </label>
                    </div>
                </div>

                <div className='flex justify-center items-center my-2'>
                    {isLoading
                        ? <Loader />
                        : <input type="submit"
                            value={'Save Changes'}
                            className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />}
                </div>
            </form>

            <div className='border-2 border-solid border-teal-800 rounded-md'>
                <button className="w-72 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                    onClick={handleIgnoreReturn}>Ignore Return</button>
                <button className="w-72 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-red-700 text-white rounded-md px-4 py-2 hover:bg-red-800 hover:text-gray-300"
                    onClick={handleReturn}>Return Pet</button>
            </div>

            <button className="w-36 mx-2 my-14 text-center transition-all cursor-pointer font-bold bg-red-700 text-white rounded-md px-4 py-2 hover:bg-red-800 hover:text-gray-300"
                onClick={handleDelete}>Delete Pet</button>

            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default EditPet