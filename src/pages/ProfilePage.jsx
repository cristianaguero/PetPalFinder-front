import { useState, useEffect, useRef } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { toast, ToastContainer } from 'react-toastify'

function ProfilePage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')

    const [emailPlaceholder, setEmailPlaceholder] = useState('')
    const [firstNamePlaceholder, setFirstNamePlaceholder] = useState('')
    const [lastNamePlaceholder, setLastNamePlaceholder] = useState('')
    const [phonePlaceholder, setPhonePlaceholder] = useState('')
    const [bioPlaceholder, setBioPlaceholder] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        async function fetchUser() {
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
                const { data } = await axiosClient.get('/users/user', config)

                setEmailPlaceholder(data.email)
                setFirstNamePlaceholder(data.name)
                setLastNamePlaceholder(data.surname)
                setPhonePlaceholder(data.phone)
                setBioPlaceholder(data.bio)

                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [isUpdated])

    async function handleChangePassword() {
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
            const { data } = await axiosClient.get('/users/update-password', config)
            navigate(`/forget-password/${data.token}`)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        setIsUpdated(!isUpdated)

        if((email === '' && name === '' && surname === '' && phone === '' && bio === '')) {
            toast.warning('Please fill in at least one field')
            setIsLoading(false)
            return
        }

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
            bio
        }

        try {
            await axiosClient.put('/users/profile', body, config)
            toast.success('Profile updated successfully')

            setEmail('')
            setName('')
            setSurname('')
            setPhone('')
            setBio('')
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoading(false)
        }
    }



    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">
            <h1 className="text-teal-800 font-black text-4xl text-center">Manage your information here</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <div>
                {isLoading && <Loader />}
            </div>
            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-teal-800 font-bold mb-2'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder={emailPlaceholder}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                />

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

                <label htmlFor='bio' className='text-teal-800 font-bold mb-2'>Bio</label>
                <textarea
                    id='bio'
                    placeholder={bioPlaceholder ? bioPlaceholder : 'Tell us about yourself!'}
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength='300'
                    rows='4'

                />

                <input type="submit"
                    value={'Save Changes'}
                    className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />
            </form>

            <button className="mb-4 w-72 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300"
                onClick={handleChangePassword}> Change Password</button>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default ProfilePage