import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

function ForgetPassword() {

    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const userRef = useRef()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        if (email === '') {
            toast.warning('Please put your email')
            return
        }
        setIsLoading(true)
        try {
            const { data } = await axiosClient.post(`/users/forget-password`, {email})
            toast.success(data.message)
            setEmail('')
            setTimeout(() => {
                navigate('/')
            }, 2500)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.error)
            setEmail('')
            setIsLoading(false)
        }
    }

    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">
            <h1 className="text-teal-800 font-black text-4xl text-center">Did you forget the password?</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <p className='text-teal-800 text-center mb-5'>Enter your email and we will send you instructions to reset your password</p>

            <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
            onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-teal-800 font-bold mb-2'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={userRef}
                />

                <input type="submit"
                    value={'Send Instructions'}
                    className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />
            </form>

            {isLoading && <Loader />}

            <ToastContainer autoClose={2000} />

        </div>
    )
}

export default ForgetPassword