import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import pawIcon from '../assets/img/icon.webp'

function NavUser() {

    const location = useLocation()
    const navigate = useNavigate()

    const { auth, setAuth } = useAuth()

    function handleLogOut() {
        localStorage.removeItem('petPalsToken')
        localStorage.removeItem('userToEdit')
        localStorage.removeItem('petToEdit')
        setAuth({})
        navigate('/')
    }

    return (
        <div className="w-full">
            <nav className="text-white p-2 flex justify-between items-center">
                <div className='w-4/5 justify-around items-center flex mr-2'>
                    <Link to='/user' className={`${location.pathname === '/user' ? 'text-white' : 'text-gray-400'} transition-all mx-2 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/user' && 'md:inline'} mr-1 w-5 hidden`} />
                        Home
                    </Link>

                    <Link to='/search' className={`${location.pathname === '/search' ? 'text-white' : 'text-gray-400'} transition-all mx-2 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/search' && 'md:inline'} mr-1 w-5 hidden`} />
                        Search
                    </Link>

                    <Link to='/user/my-pets' className={`${location.pathname === '/user/my-pets' ? 'text-white' : 'text-gray-400'} transition-all mx-2 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/user/my-pets' && 'md:inline'} mr-1 w-5 hidden`} />
                        My Pets
                    </Link>

                    <Link to='/about' className={`${location.pathname === '/about' ? 'text-white' : 'text-gray-400'} transition-all mx-2 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/about' && 'md:inline'} mr-1 w-5 hidden`} />
                        About
                    </Link>

                    {auth.admin && <Link to='/admin' className={`${location.pathname === '/admin' ? 'text-white' : 'text-blue-400'} font-semibold transition-all mx-2 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/admin' && 'md:inline'} mr-1 w-5 hidden`} />
                        ADMIN
                    </Link>}

                </div>
                <div className="border-solid border-white  border-l-2 pl-4">
                    <button className="transition-all ml-4 hover:text-red-800 text-red-400 font-bold"
                        onClick={handleLogOut}>
                        Sign Out
                    </button>
                </div>
            </nav>

        </div>
    )
}

export default NavUser