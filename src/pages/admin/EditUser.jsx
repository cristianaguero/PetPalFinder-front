import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../config/axiosClient'
import Loader from '../../components/Loader'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function EditUser() {

    let userLocalStorage = localStorage.getItem('userToEdit')
    userLocalStorage = JSON.parse(userLocalStorage)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')

    const [firstNamePlaceholder, setFirstNamePlaceholder] = useState('')
    const [lastNamePlaceholder, setLastNamePlaceholder] = useState('')
    const [phonePlaceholder, setPhonePlaceholder] = useState('')

    const [admin, setAdmin] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        function populateUser() {

            const { email, name, surname, phone, admin, confirmed } = userLocalStorage

            setEmail(email)
            setFirstNamePlaceholder(name)
            setLastNamePlaceholder(surname)
            setPhonePlaceholder(phone)
            setAdmin(admin)
            setConfirmed(confirmed)
        }
        populateUser()
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
            surname,
            phone,
            admin,
            confirmed
        }

        const _id = userLocalStorage._id

        try {
            const data = await axiosClient.put(`/users/update-user/${_id}`, body, config)
            toast.success('User updated successfully')

            setName('')
            setSurname('')
            setPhone('')

            setFirstNamePlaceholder(data.data.name)
            setLastNamePlaceholder(data.data.surname)
            setPhonePlaceholder(data.data.phone)

            setIsLoading(false)

        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoading(false)
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

        const _id = userLocalStorage._id

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
                    const { data } = await axiosClient.delete(`/users/delete-user/${_id}`, config)
                    toast.success(data.message)
                    setIsLoading(false)

                    localStorage.removeItem('userToEdit')
                    navigate('/admin/search-user')

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

    return (
        <div className="w-full mx-auto mt-5 pb-28 px-2 flex flex-col justify-center items-center">
            <h1 className="text-teal-800 font-black text-4xl text-center">User: {email}</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <div>
                {isLoading && <Loader />}
            </div>
            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                onSubmit={handleSubmit}>

                <div className='flex justify-between'>
                    <div className='w-5/12'>
                        <label htmlFor="firstName" className='text-teal-800 font-bold mb-2 block'>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder={firstNamePlaceholder}
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ref={userRef}
                        />
                    </div>

                    <div className='w-5/12'>
                        <label htmlFor="lastName" className='text-teal-800 font-bold mb-2 block'>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder={lastNamePlaceholder}
                            className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none w-full"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                </div>

                <label htmlFor="phone" className='text-teal-800 font-bold mb-2'>Phone</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder={phonePlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className='flex justify-center items-center my-2'>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={(e) => setAdmin(!admin)} checked={admin} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span className="ml-3 text-md font-bold text-teal-800" >Admin</span>
                    </label>
                </div>

                <div className='flex justify-center items-center my-2'>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={(e) => setConfirmed(!confirmed)} checked={confirmed} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span className="ml-3 text-md font-bold text-teal-800" >Confirmed</span>
                    </label>
                </div>

                <input type="submit"
                    value={'Save Changes'}
                    className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />
            </form>

            <button className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-red-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                onClick={handleDelete}>Delete user</button>

            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default EditUser