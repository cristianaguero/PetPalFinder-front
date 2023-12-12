import { Link } from 'react-router-dom'

function MyPetsCard({ pet }) {

    const { name, type, picture } = pet

    const handleClick = () => {
        localStorage.setItem('petToEdit', JSON.stringify(pet))
    }

    return (
        <div className="space-y-8 mb-4 bg-gray-100 p-2 rounded-md shadow-md w-full">
            <div className="flex items-center justify-between">
                <img src={picture} alt="pet picture" className="w-20 rounded-full" />
                <div className="ml-4 space-y-1">
                    <p className="font-medium leading-none">{name}</p>

                    <p className="text-sm text-muted-foreground">
                        {type}
                    </p>
                </div>

                <div className="ml-4 space-y-1">
                <Link to='/pet-page' className=" text-center transition-all cursor-pointer text-sm bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                    onClick={handleClick}
                >Handle Pet</Link>
                </div>

            </div>

        </div>
    )
}

export default MyPetsCard