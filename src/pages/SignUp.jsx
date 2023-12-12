import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Loader from '../components/Loader'
import ModalLink from '../components/ModalLink'
import Login from './Login'

function SignUp() {

    const [loginUser, setLoginUser] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPhone, setUserPhone] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        if ([loginUser, userPassword, userPasswordConfirm, userFirstName, userLastName, userPhone].includes('')) {
            toast.warning('Please fill all the fields')
            setIsLoading(false)
            return
        } else if (userPassword !== userPasswordConfirm) {
            toast.warning('Passwords do not match')
            setUserPassword('')
            setUserPasswordConfirm('')
            setIsLoading(false)
            return
        } else if (userPassword.length < 6) {
            toast.warning('Password must be at least 6 characters')
            setUserPassword('')
            setUserPasswordConfirm('')
            setIsLoading(false)
            return
        } else {

            try {
                const { data } = await axiosClient.post(`/users/signup`, {
                    email: loginUser,
                    password: userPassword,
                    name: userFirstName,
                    surname: userLastName,
                    phone: userPhone
                })

                toast.success(data.message)
                setIsLoading(false)
                setLoginUser('')
                setUserPassword('')
                setUserPasswordConfirm('')
                setUserFirstName('')
                setUserLastName('')
                setUserPhone('')

                setTimeout(() => {
                    navigate('/user')
                }, 2500)

            } catch (error) {
                toast.error(error.response.data.error)
                setLoginUser('')
                setUserPassword('')
                setUserPasswordConfirm('')
                setIsLoading(false)
            }
        }
    }

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-teal-800 font-black text-4xl">Sing Up and find your next pet pal!</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 mt-5'></div>

            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-teal-800 font-bold mb-2'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    ref={userRef}
                />

                <label htmlFor="firstName" className='text-teal-800 font-bold mb-2'>First Name</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder='Enter your first name'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                />

                <label htmlFor="lastName" className='text-teal-800 font-bold mb-2'>Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder='Enter your last name'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none w-full"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                />

                <label htmlFor="phone" className='text-teal-800 font-bold mb-2'>Phone</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder='Enter your phone number'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                />

                <label htmlFor="password" className='text-teal-800 font-bold mb-2'>Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='Enter your password'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <label htmlFor="passwordConfirm" className='text-teal-800 font-bold mb-2'>Confirm Password</label>
                <input
                    type="password"
                    id="passwordConfirm"
                    placeholder='Confirm your password'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={userPasswordConfirm}
                    onChange={(e) => setUserPasswordConfirm(e.target.value)}
                />

                <div className='flex justify-center items-center'>
                    {isLoading
                        ? <Loader />
                        : <input type="submit"
                            value={'Sign Up'}
                            className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />}
                </div>

                <ModalLink name={'Already have an account? Sign In'} >
                    <Login />
                </ModalLink>

            </form>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default SignUp