import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import Fosterers from "../components/dashboard/Fosterers"
import Admins from "../components/dashboard/Admins"
import Owners from "../components/dashboard/Owners"
import Cake from "../components/dashboard/Cake"
import { useEffect, useState } from "react"
import axiosClient from "../config/axiosClient"
import Loader from "../components/Loader"
import Returns from "../components/dashboard/Returns"

function AdminPage() {

    const { auth } = useAuth()

    if (!auth.admin) return <Navigate to='/user' />

    const [owners, setOwners] = useState([])
    const [fosterers, setFosterers] = useState([])
    const [admins, setAdmins] = useState([])
    const [returns, setReturns] = useState([])
    const [allPets, setAllPets] = useState([])


    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getAdminInfo() {
            setIsLoading(true)
            const token = localStorage.getItem('petPalsToken')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient.get('/users/users', config)
                setAdmins(data.filter(user => user.admin === true))
                setOwners(data.filter(user => user.adoptedPets && user.adoptedPets.length > 0))
                setFosterers(data.filter(user => user.fosteredPets && user.fosteredPets.length > 0))
                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
                setIsLoading(false)
            }
        }
        getAdminInfo()
    }, [])

    useEffect(() => {
        async function getReturns() {
            setIsLoading(true)

            const token = localStorage.getItem('petPalsToken')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {

                const { data } = await axiosClient.get('/pets', config)

                setAllPets(data)

                const toBeReturned = data.filter(pet => pet.toBeReturned === true)

                setReturns(toBeReturned)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
                setIsLoading(false)
            }
        }
        getReturns()
    }, [])

    return (
        <div className="flex flex-col items-center pb-36">
            <h1 className="text-teal-800 font-black text-4xl text-center">Dashboard</h1>
            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            {isLoading && <Loader />}

            <div className="md:grid grid-cols-2 grid-rows-3 gap-4">
                <Owners owners={owners} />
                <Fosterers fosterers={fosterers} />
                <Cake allPets={allPets}/>
                <Admins admins={admins} />
                <div className="col-span-2">
                    <Returns returns={returns} />
                </div>
            </div>

        </div>
    )
}

export default AdminPage