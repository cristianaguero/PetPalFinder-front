import myPets from '../assets/img/my-pets.webp'

function MyPetsComp() {
    return (
        <div className="flex justify-center items-center flex-col w-96 h-96 text-center bg-gray-50 rounded-md shadow-lg p-10">
            <h1 className="text-5xl text-teal-700 mb-20">My Pets</h1>
            <img src={myPets} alt="pets" className=""/>
        </div>
    )
}

export default MyPetsComp