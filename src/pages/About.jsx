import sidePic from '../assets/img/side.webp'

function About() {
    return (
        <div className="md:w-3/4 w-full mx-auto mt-28 pb-28 px-2 flex flex-col justify-center items-center">

            <h1 className="text-teal-800 font-black text-4xl text-center">About us</h1>
            <div className='border-solid border-b-4 border-teal-700 w-4/5 my-5'></div>

            <div className='flex flex-col md:flex-row justify-between mt-5 items-center'>

                <main className="text-lg text-teal-800 font-semibold md:w-3/4">
                    <p className="my-2">
                        At PetPal Finder, we understand the unique bond that forms between a pet and their human, and we're here to help you make that special connection. Whether you're looking for a loyal canine companion, a curious feline friend, or any other delightful critter, we've got a diverse array of adoptable pets waiting to steal your heart.
                    </p>

                    <p className="my-2">
                        Our easy-to-navigate platform allows you to explore profiles of pets seeking their forever homes. Each profile is filled with endearing photos, charming personalities, and heartwarming stories. You can filter your search based on species, size, age, and more, ensuring that you find a pet that perfectly fits your lifestyle and preferences.
                    </p>

                    <p className="my-2">
                        Adopting a pet from PetPal Finder means you're not just gaining a pet - you're becoming a hero in their story. You're offering a second chance to an animal in need, providing them with love, care, and a safe haven. Our dedicated adoption counselors are here to guide you through the process, ensuring that both you and your new companion are set up for a lifetime of happiness together.
                    </p>

                    <p className="my-2">
                        Join us in making a difference, one paw at a time. Begin your journey of companionship today with PetPal Finder. Because when you adopt, you not only change the life of a pet - they change yours in the most wonderful ways.
                    </p>

                </main>
                <aside className='hidden md:block w-1/4 mr-4'>
                    <img src={sidePic} alt="pets looking" className='min-w-max' />
                </aside>
            </div>
        </div>
    )
}

export default About