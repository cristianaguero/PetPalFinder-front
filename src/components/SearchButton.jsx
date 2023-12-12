import { Link } from 'react-router-dom'

function SearchButton() {
    return (
        <div className='flex justify-center items-center'>
            <Link to='/search' className="mb-4 w-3/5 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 mt-10 hover:bg-teal-800 hover:text-gray-300" >Let's search for your next pet pal!</Link>
        </div>
    )
}

export default SearchButton