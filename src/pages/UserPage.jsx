import { Link } from "react-router-dom"
import HeaderUser from "../components/HeaderUser"
import MyPetsComp from "../components/MyPetsComp"
import ProfileComp from "../components/ProfileComp"
import SearchButton from "../components/SearchButton"


function UserPage() {
    return (
        <div className="mt-24 pb-28 h-4/5 container px-2 mx-auto">
            <HeaderUser />
            <SearchButton />

            <div className="flex flex-col md:flex-row justify-around items-center mt-10">
                <Link to='/user/my-pets' className="text-2xl font-bold mb-5 border-solid border-2 border-teal-700 rounded-md m-2 shadow-md">
                    <MyPetsComp />
                </Link>
                <Link to='/user/profile' className="text-2xl font-bold mb-5 border-solid border-2 border-teal-700 rounded-md m-2 shadow-md">
                    <ProfileComp />
                </Link>
            </div>
        </div>
    )
}

export default UserPage