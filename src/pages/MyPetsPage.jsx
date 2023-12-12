import { useEffect, useState } from "react"
import axiosClient from "../config/axiosClient"
import Loader from "../components/Loader"
import MyPetsCard from "../components/MyPetsCard"
import sadImage from '../assets/img/sad.webp'
import sadImage2 from '../assets/img/sad2.webp'

function MyPetsPage() {

    const [adoptedPets, setAdoptedPets] = useState([])
    const [fosteredPets, setFosteredPets] = useState([])
    const [savedPets, setSavedPets] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getMyPets() {
            setIsLoading(true)

            const token = localStorage.getItem('petPalsToken')
            if (!token) {
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

                setAdoptedPets(data.adoptedPets)
                setFosteredPets(data.fosteredPets)
                setSavedPets(data.savedPets)

                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
                setIsLoading(false)
            }
        }
        getMyPets()
    }, [])


    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">

            <h1 className="text-teal-800 font-black text-4xl text-center">My pets</h1>
            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            {isLoading && <Loader />}

            <div className="md:grid grid-cols-2 grid-rows-2">

                <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-4 m-2 shadow-md h-96 overflow-y-scroll">

                    <h2 className="text-teal-800 font-black text-2xl text-center mb-5">Adopted Pets</h2>

                    <div className=" flex flex-col justify-center items-center">

                        {adoptedPets.length === 0
                            ? (<div className="flex flex-col justify-center items-center">
                                <p className="text-teal-800 font-black text-4xl text-center mb-5">You don't have Pet Pals yet!</p>
                                <img className="w-40" src={sadImage2} alt="sad puppy" />
                            </div>)
                            : (adoptedPets.map(pet => <MyPetsCard key={pet._id} pet={pet} />))}

                    </div>
                </div>

                <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-4 m-2 shadow-md h-96 overflow-y-scroll">

                    <h2 className="text-teal-800 font-black text-2xl text-center mb-5">Fostered Pets</h2>

                    <div className=" flex flex-col justify-center items-center">

                        {fosteredPets.length === 0
                            ? (<div className="flex flex-col justify-center items-center">
                                <p className="text-teal-800 font-black text-4xl text-center mb-5">You don't have Pet Pals yet!</p>
                                <img className="w-40" src={sadImage2} alt="sad puppy" />
                            </div>)
                            : (fosteredPets.map(pet => <MyPetsCard key={pet._id} pet={pet} />))}

                    </div>
                </div>

                <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-4 m-2 shadow-md col-span-2 overflow-y-scroll h-96">

                    <h2 className="text-teal-800 font-black text-2xl text-center mb-5">Favorite Pets</h2>
                    <div className=" flex flex-col justify-center items-center">

                        {savedPets.length === 0
                            ? (<div className="flex flex-col justify-center items-center">
                                <p className="text-teal-800 font-black text-4xl text-center mb-5">Apparently you don't like any Pet Pals...</p>
                                
                                <img className="w-40" alt="sad pet" src={sadImage} />

                            </div>)
                            : (savedPets.map(pet => <MyPetsCard key={pet._id} pet={pet} />))}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default MyPetsPage