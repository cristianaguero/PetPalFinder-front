import Login from './Login'
import SignUp from './SignUp'
import SearchButton from '../components/SearchButton'
import catPeak from '../assets/img/cat-peak.webp'
import ModalLogin from '../components/ModalLogin'


function WelcomePage() {

    return (
        <div className="mt-28 pb-28 h-4/5 container px-10 mx-auto">
            <header>
                <div className='flex justify-center items-center h-56'>
                    <img src={catPeak} alt="cat peaking" className='h-60 min-w-max' />
                </div>
                <h2 className="text-3xl font-bold text-teal-800">
                    Welcome to PetPal Finder, your ultimate destination for finding your new furry family member! Our mission is to bring joy, love, and companionship into your life through the magic of pet adoption.
                </h2>
            </header>

            <div className='text-lg text-teal-800 font-bold'>
                <SearchButton />

                <p className="text-3xl my-2 text-center">Or</p>

                <div className="flex flex-col md:flex-row md:justify-between md:w-2/3 px-8 mx-auto mt-5">
                    
                        <ModalLogin name={'Sign In'}>
                                <Login />
                        </ModalLogin>

                        <ModalLogin name={'Sign Up'}>
                                <SignUp />
                        </ModalLogin>
                
                </div>

            </div>
        </div>
    )
}

export default WelcomePage