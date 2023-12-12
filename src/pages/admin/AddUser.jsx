import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axiosClient from '../../config/axiosClient'
import Loader from '../../components/Loader'


function AddUser() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [admin, setAdmin] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        if ([email, password, passwordConfirm, name, surname, phone].includes('')) {
            toast.warning('Please fill all the fields')
            setIsLoading(false)
            return
        } else if (password !== passwordConfirm) {
            toast.warning('Passwords do not match')
            setPassword('')
            setPasswordConfirm('')
            setIsLoading(false)
            return
        } else if (password.length < 6) {
            toast.warning('Password must be at least 6 characters')
            setPassword('')
            setPasswordConfirm('')
            setIsLoading(false)
            return
        } else {

            try {
                const { data } = await axiosClient.post(`/users/signup`, {
                    email,
                    password,
                    name,
                    surname,
                    phone,
                    admin
                })

                toast.success(data.message)
                setIsLoading(false)
                setName('')
                setSurname('')
                setPhone('')
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                setAdmin(false)

            } catch (error) {
                toast.error(error.response.data.error)
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                setIsLoading(false)
            }
        }
    }

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    return (
        <div className="flex flex-col items-center pb-36">
            <h1 className="text-teal-800 font-black text-4xl">Add a new user</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 mt-5'></div>

            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-teal-800 font-bold mb-2'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter user's email"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={userRef}
                />




                <label htmlFor="firstName" className='text-teal-800 font-bold mb-2'>First Name</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Enter user's first name"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />



                <label htmlFor="lastName" className='text-teal-800 font-bold mb-2'>Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Enter user's last name"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none w-full"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />


                <label htmlFor="phone" className='text-teal-800 font-bold mb-2'>Phone</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="Enter user's phone number"
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label htmlFor="password" className='text-teal-800 font-bold mb-2'>Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='Enter temporary password'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="passwordConfirm" className='text-teal-800 font-bold mb-2'>Confirm Password</label>
                <input
                    type="password"
                    id="passwordConfirm"
                    placeholder='Confirm temporary password'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />

                <div className='flex justify-center items-center my-2'>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                        <input type="checkbox" value={admin} className="sr-only peer" onChange={(e) => setAdmin(!admin)} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        <span className="ml-3 text-md font-bold text-teal-800" >Admin</span>
                    </label>
                </div>

                <div className='flex justify-center items-center'>
                    {isLoading
                        ? <Loader />
                        : <input type="submit"
                            value={'Add User'}
                            className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />}
                </div>
            </form>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default AddUser