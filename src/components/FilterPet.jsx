import { useState, useEffect } from 'react'
import axiosClient from '../config/axiosClient'

function FilterPet({ setFilteredPets, types, breeds }) {



    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState(false)
    const [status, setStatus] = useState('')

    useEffect(() => {
        async function GetFilteredPets() {
            try {
                const { data } = await axiosClient.get(`/pets/filter?${type ? `type=${type}` : ''}${breed ? `&breed=${breed}` : ''}${hypoallergenic ? `&hypoallergenic=${hypoallergenic}` : ''}${status ? `&status=${status}` : ''}`)
            
            setFilteredPets(data)
            } catch (error) {
                console.log(error.response.data.error)
            }
        }
        GetFilteredPets()
    }, [type, breed, hypoallergenic, status])

    return (
        <div>
            <h2 className="text-teal-800 text-center font-bold text-2xl mb-2">Filter your search</h2>

            <div className='flex justify-around items-s flex-col md:flex-row'>

                <div className="flex justify-center items-center mx-2">
                    <label htmlFor="type" className="text-teal-800 font-bold text-lg mb-2 mr-2">Type</label>
                    <select id="type" name="type" className="border-solid border-2 border-teal-700 rounded-md p-1 outline-none" onChange={e => setType(e.target.value)}>
                        <option value="">All</option>
                        {types.map((type, index) => <option key={index} value={type}>{type}</option>)}
                    </select>
                </div>

                <div className="flex justify-center items-center mx-2">
                    <label htmlFor="breed" className="text-teal-800 font-bold text-lg mb-2 mr-2">Breed</label>
                    <select id="breed" name="breed" className="border-solid border-2 border-teal-700 rounded-md p-1 outline-none" onChange={e => setBreed(e.target.value)}>
                        <option value="">All</option>
                        {breeds.map((breed, index) => <option key={index} value={breed}>{breed}</option>)}
                    </select>
                </div>

                <div className="flex justify-center items-center mx-2">
                    <label htmlFor="status" className="text-teal-800 font-bold text-lg mb-2 mr-2">Status</label>
                    <select id="status" name="status" className="border-solid border-2 border-teal-700 rounded-md p-1 outline-none" onChange={e => setStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="available">Available</option>
                        <option value="fostered">Fostered</option>
                        <option value="adopted">Adopted</option>
                    </select>
                </div>

                <div className="flex items-center mx-4">
                    <input id="teal-checkbox" type="checkbox" value="" checked={hypoallergenic} className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded" onChange={e => setHypoallergenic(!hypoallergenic)} />
                    <label htmlFor="teal-checkbox" className="ml-2 text-sm font-medium text-teal-700">Hypoallergenic</label>
                </div>
            </div>
        </div>
    )
}

export default FilterPet