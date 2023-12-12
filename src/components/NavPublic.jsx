import { Link, useLocation } from 'react-router-dom'
import ModalNav from "./ModalNav"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import pawIcon from '../assets/img/icon.webp'

function NavPublic() {

    const location = useLocation()

    return (
        <div className="w-full">
            <nav className="text-white p-2 flex justify-between items-center">
                <div className="justify-around items-center flex w-3/5">
                    <Link to='/' className={`${location.pathname === '/' ? 'text-white' : 'text-gray-400'} transition-all ml-4 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/' && 'md:inline'} mr-1 w-5 hidden`} />
                        Home
                    </Link>

                    <Link to='/search' className={`${location.pathname === '/search' ? 'text-white' : 'text-gray-400'} transition-all ml-4 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/search' && 'md:inline'} mr-1 w-5 hidden`} />
                        Search
                    </Link>

                    <Link to='/about' className={`${location.pathname === '/about' ? 'text-white' : 'text-gray-400'} transition-all ml-4 flex`}>
                        <img src={pawIcon} className={`${location.pathname === '/about' && 'md:inline'} mr-1 w-5 hidden`} />
                        About
                    </Link>

                </div>
                <div className="border-solid border-white  border-l-2 pl-4 flex px-4 ml-4 h-9 justify-center items-center">
                    <ModalNav name={'Sign In'}>
                        <Login />
                    </ModalNav>

                    <ModalNav name={'Sign Up'}>
                        <SignUp />
                    </ModalNav>
                </div>
            </nav>
        </div>
    )
}

export default NavPublic