import Footer from "../components/Footer"
import NavPublic from "../components/NavPublic"
import { Link, Outlet } from "react-router-dom"

import logo from '../assets/img/logo-no-background.webp'

function LayoutPublic() {
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center fixed top-0 left-0 w-full bg-teal-700 px-4">
                <Link to='/' className="w-2/5 hidden md:block">
                    <img src={logo} alt="logo" className="h-16 my-3 mr-10" />
                </Link>
                <div className="h-12 mx-2 flex items-center  w-full">

                    <NavPublic />

                </div>
            </div>

            <main>
                <Outlet />
            </main>

            <div className="fixed bottom-0 left-0 w-full bg-teal-700 px-4">
                <Footer />
            </div>
        </div>

    )
}

export default LayoutPublic