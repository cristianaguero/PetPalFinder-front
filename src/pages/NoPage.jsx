import { Link } from "react-router-dom"
import page404 from '../assets/img/404.webp'

function NoPage() {
    return (


        <div className="flex items-center justify-center w-screen h-screen bg-[#97d5cc]">
            <Link to='/' className="flex items-center justify-center w-screen h-screen bg-[#97d5cc]">
                <img src={page404} alt="404 error" />
            </Link>
        </div>
    )
}

export default NoPage