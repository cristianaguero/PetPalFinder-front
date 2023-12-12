import PetCard from "./PetCard"

function PetCardContainer({ pets }) {

    return (
        <div className='flex justify-center flex-wrap md:mx-auto pb-10'>
            {pets.map(pet => (<PetCard key={pet._id} pet={pet} />))}
        </div>
    )
}

export default PetCardContainer