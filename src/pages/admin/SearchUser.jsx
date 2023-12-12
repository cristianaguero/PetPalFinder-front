import SearchFormUser from "../../components/SearchFormUser"
import { useEffect, useState } from "react"
import UserCardContainer from "../../components/UserCardContainer"
import axiosClient from "../../config/axiosClient"
import Loader from "../../components/Loader"

function SearchUser() {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getAllUsers() {
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
                const { data } = await axiosClient.get('/users/users', config)
                setUsers(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
                setIsLoading(false)
            }
        }
        getAllUsers()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <SearchFormUser setUsers={setUsers} />

            <div className='border-solid border-b-4 border-teal-700 w-full mt-5 mb-3'></div>

            {isLoading
                ? <Loader />
                : <UserCardContainer users={users} />}
        </div>
    )
}

export default SearchUser