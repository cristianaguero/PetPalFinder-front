import { Link } from 'react-router-dom'
import footLogo from '../assets/img/petpal-finder-website-favicon-white.webp'

function Footer() {
    return (
        <div className="flex justify-between items-center text-white">
            <Link to='/' className="w-12">
                <img src={footLogo} alt="logo"  />
            </Link>

            <p>Page created by Cristian Aguero</p>
            <p>© 2023 PetPal Finder</p>
        </div>
    )
}

export default Footer