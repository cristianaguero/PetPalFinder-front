import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { toast, ToastContainer } from 'react-toastify'
import axiosClient from '../config/axiosClient'
import ModalLink from '../components/ModalLink'

import useAuth from '../hooks/useAuth'
import SignUp from './SignUp'

function Login() {

    const [loginUser, setLoginUser] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const { setAuth } = useAuth()

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if ([loginUser, userPassword].includes('')) {
            toast.warning('Please fill all the fields')
            return
        }

        setIsLoading(true)

        try {
            const { data } = await axiosClient.post('/users/login', {
                email: loginUser,
                password: userPassword
            })

            localStorage.setItem('petPalsToken', data.token)

            setAuth(data)

            toast.success('Welcome to Pet Pals!')

            navigate('/user')

            setIsLoading(false)
            setUserPassword('')
            setLoginUser('')
        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoading(false)
            setUserPassword('')
            setLoginUser('')
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-teal-800 font-black mx-4 text-4xl">Sing In and manage your pet pals!</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 mt-10'></div>

            <form className="flex flex-col items-left text-teal-800 p-10 rounded-xl w-4/5"
                onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-teal-800 font-bold mb-4'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    ref={userRef}
                />

                <label htmlFor="password" className='text-teal-800 font-bold mb-4'>Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='Enter your password'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-4 outline-none"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <div className='flex justify-center'>
                    {isLoading
                        ? <Loader />

                        : <input type="submit"
                            value={'Sign In'}
                            className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-10 hover:bg-teal-800 hover:text-gray-300" />}
                </div>

                <div className='flex md:flex-row flex-col text-sm'>

                    <ModalLink name={"Don't have an account? Sign Up"}>
                        <SignUp />
                    </ModalLink>

                    <Link className="transition-all ml-2 bg-white px-2 text-teal-800 rounded-md hover:bg-gray-100 hover:text-teal-700" to="/forget-password">Did you forget the password?</Link>
                </div>
            </form>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Login