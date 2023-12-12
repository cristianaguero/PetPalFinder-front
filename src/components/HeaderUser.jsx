import useAuth from "../hooks/useAuth"
import catGreet from "../assets/img/cat-greet.webp"
import dogGreet from "../assets/img/dog-greet.webp"


function HeaderUser() {

    const { auth } = useAuth()
    
    return (
        <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="h-40 mt-4">
                <img src={catGreet} alt="dog greeting" className="h-40" />
            </div>
            <div className="flex flex-col text-center">
                <h1 className="text-teal-700 font-black text-5xl pr-2 mr-2 mb-2">
                    Welcome
                </h1>
                <h2 className="text-teal-700 font-black text-6xl pr-2 mr-2 mb-2">{auth.name}</h2>
                <h2 className="text-teal-700 font-black text-6xl pr-2 mr-2">{auth.surname}!</h2>
            </div>
            <div className="h-40 flex items-center">
                <img src={dogGreet} alt="dog greeting" className="h-64" />
            </div>
        </div>
    )
}

export default HeaderUser