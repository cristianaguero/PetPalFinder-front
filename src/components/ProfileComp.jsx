import dogPic from '../assets/img/profile-dog.webp'

function ProfileComp() {
    return (
        <div className="flex justify-center items-center flex-col w-96 h-96 text-center bg-gray-50 rounded-md shadow-lg p-10">
            <h1 className="text-5xl text-teal-700 mb-10">My Profile</h1>
            <img src={dogPic} alt="dog with shades" className="w-64"/>
        </div>
    )
}

export default ProfileComp