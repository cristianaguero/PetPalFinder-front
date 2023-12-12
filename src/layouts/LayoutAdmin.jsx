import Footer from "../components/Footer"
import { Link, Outlet, Navigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Loader from "../components/Loader"

import useAuth from "../hooks/useAuth"
import NavAdmin from "../components/NavAdmin"

import logo from '../assets/img/logo-no-background.webp'

function LayoutAdmin() {

    const { auth, isLoading } = useAuth()

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader /></div>

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center fixed top-0 left-0 w-full bg-teal-700 px-4">
                <Link to='/' className="w-2/5 hidden md:block">
                    <img src={logo} alt="logo" className="h-16 my-3 mr-10" />
                </Link>
                <div className="h-12 mx-2 flex items-center  w-full">
                    {auth.admin ? <NavAdmin /> : <Navigate to='/' />}
                </div>
            </div>

            <div className="flex h-screen">
                <aside className="w-36 bg-teal-600  md:w-40">
                    <Sidebar />
                </aside>
                <main className=" w-full overflow-scroll pt-24 px-4">
                    <Outlet />
                </main>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-teal-700 px-4">
                <Footer />
            </div>
        </div>
    )
}

export default LayoutAdmin