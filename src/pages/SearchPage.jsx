import PetCardContainer from "../components/PetCardContainer"
import SearchFormPet from "../components/SearchFormPet"
import Loader from "../components/Loader"
import { useEffect, useState } from "react"
import axiosClient from "../config/axiosClient"
import FilterPet from "../components/FilterPet"


function SearchPage() {

    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [types, setTypes] = useState([])
    const [breeds, setBreeds] = useState([])

    useEffect(() => {
        async function getAllPets() {
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
                const { data } = await axiosClient.get('/pets', config)
                setPets(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response.data.error)
                setIsLoading(false)
            }
        }
        getAllPets()
    }, [])

    useEffect(() => {
        function getTypes() {
            const types = pets.map(pet => pet.type)
            const uniqueTypes = [...new Set(types)]
            setTypes(uniqueTypes)
        }

        function getBreeds() {
            const breeds = pets.map(pet => pet.breed)
            const uniqueBreeds = [...new Set(breeds)]
            setBreeds(uniqueBreeds)
        }

        getTypes()
        getBreeds()
    }, [pets])

    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">

            <h1 className="text-teal-800 font-black text-4xl text-center">Find your next Pet Pal!</h1>

            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <div className="mb-5">

                <SearchFormPet pets={pets} setFilteredPets={setFilteredPets} />

                <FilterPet setFilteredPets={setFilteredPets} pets={pets} types={types} breeds={breeds} />

            </div>

            <div>
                {isLoading && <Loader />}
            </div>

            <div>
                {filteredPets ? <PetCardContainer pets={filteredPets} /> :
                <PetCardContainer pets={pets} /> }
            </div>

        </div>
    )
}

export default SearchPage