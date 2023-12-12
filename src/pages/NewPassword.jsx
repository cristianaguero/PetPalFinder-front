import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../config/axiosClient'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

function NewPassword() {

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    const [isValidToken, setIsValidToken] = useState(false)

    const [isCheckingToken, setIsCheckingToken] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()
    const { token } = params

    const navigate = useNavigate()

    const userRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            userRef.current.focus()
        }, 500);
    }, [isCheckingToken])

    useEffect(() => {
        async function checkToken() {
            setIsCheckingToken(true)
            try {
                await axiosClient.get(`/users/forget-password/${token}`)
                setIsValidToken(true)
                setIsCheckingToken(false)
            } catch (error) {
                toast.error(error.response.data.error)
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }
        }
        checkToken()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        if ([newPassword, newPasswordConfirm].includes('')) {
            toast.warning('Please fill all the fields')
            return
        } else if (newPassword !== newPasswordConfirm) {
            toast.warning('Passwords do not match')
            setNewPassword('')
            setNewPasswordConfirm('')
            return
        } else if (newPassword.length < 6) {
            toast.warning('Password must be at least 6 characters')
            setNewPassword('')
            setNewPasswordConfirm('')
            return
        } else {
            setIsLoading(true)
            try {
                if (!isValidToken) {
                    return
                } else {
                    const { data } = await axiosClient.post(`/users/forget-password/${token}`, {
                        password: newPassword
                    })
                    toast.success(data.message)
                    setTimeout(() => {
                        navigate('/')
                    }, 2500)
                }
                setIsLoading(false)
            } catch (error) {
                toast.error(error.response.data.error)
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">
            <h1 className="text-teal-800 font-black text-4xl text-center">
                Reset Password</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <p className='text-teal-800 text-center mb-5'>Please enter your new password</p>

            {isCheckingToken
                ? <Loader />
                : <form className="flex flex-col items-left text-teal-800 px-10 py-2 rounded-xl w-4/5"
                    onSubmit={handleSubmit}>
                    <label htmlFor="password" className='text-teal-800 font-bold mb-2'>New Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter your password'
                        className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        ref={userRef}
                    />

                    <label htmlFor="passwordConfirm" className='text-teal-800 font-bold mb-2'>Confirm New Password</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        placeholder='Confirm your password'
                        className="border-solid border-2 border-teal-800 rounded-md p-2 mb-2 outline-none"
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />


                    {isLoading ?
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                        : <input type="submit"
                            value={'Save New Password'}
                            className="mb-4 w-full text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-5 hover:bg-teal-800 hover:text-gray-300" />}
                </form>}
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default NewPassword