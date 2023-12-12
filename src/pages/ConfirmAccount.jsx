import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import { ToastContainer, toast } from 'react-toastify'

function ConfirmAccount() {

    const { token } = useParams()

    const navigate = useNavigate()

    const [isConfrimed, setIsConfirmed] = useState(false)

    useEffect(() => {
        async function confirmAccount() {
            try {
                const url = `/users/confirm-account/${token}`
                const { data } = await axiosClient.get(url)
                toast.success(data.message)
                setIsConfirmed(true)
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            } catch (error) {
                toast.error(error.response.data.error)
        }
    }
        confirmAccount()
    }, [])

    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">
        <h1 className="text-teal-800 font-black text-4xl text-center">
            Account Confirmation</h1>

        <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

        {isConfrimed ? <p className='text-teal-800 text-xl text-center mb-5'>Your account was succesfully confirmed! please, sign in!</p> : <p className='text-teal-800 text-xl text-center mb-5'>Your account is being confirmed, please wait!</p>}

        <ToastContainer autoClose={2000} />
    </div>
    )
}

export default ConfirmAccount