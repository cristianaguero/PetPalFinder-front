import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

function Sidebar() {

    const location = useLocation()

    return (
        <div className='pt-24 bg-teal-600 text-center text-white font-semibold'>
            <div className="mb-6">
                <h2 className="text-4xl">Pets</h2>
                <nav className="text-start py-2 px-4">
                    <ul>
                        <Link to='/admin/add-pet' className={`${location.pathname === '/admin/add-pet' ? 'text-white' : 'text-gray-400'} text-xl transition-all ml-4 flex mb-4 md:mb-2`}>Add Pet</Link>
                        <Link to='/admin/search-pet' className={`${location.pathname === '/admin/search-pet' ? 'text-white' : 'text-gray-400'} text-xl transition-all ml-4 flex mb-4 md:mb-2`}>Edit Pet</Link>
                    </ul>
                </nav>
            </div>
            <div className="mb-6">
                <h2 className="text-4xl">Users</h2>
                <nav className="text-start py-2 px-4">
                    <ul>
                        <Link to='/admin/add-user' className={`${location.pathname === '/admin/add-user' ? 'text-white' : 'text-gray-400'} text-xl transition-all ml-4 flex mb-4 md:mb-2`}>Add User</Link>
                        <Link to='/admin/search-user' className={`${location.pathname === '/admin/search-user' ? 'text-white' : 'text-gray-400'} text-xl transition-all ml-4 flex mb-4 md:mb-2`}>Edit User</Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar