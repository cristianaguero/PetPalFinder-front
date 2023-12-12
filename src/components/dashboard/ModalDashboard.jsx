import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import PetCard from '../PetCard'

export default function ModalDashboard(pets) {
    let [isOpen, setIsOpen] = useState(false)

    const petsList = pets.pets

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>

            <button
                type="button"
                onClick={openModal}
                className="w-18 mx-2 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-1 hover:bg-teal-800 hover:text-gray-300"
            >
                Pets
            </button>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-teal-800 font-black text-2xl text-center mb-5"
                                    >
                                        Pets
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {petsList.map((pet) => (<PetCard key={pet._id} pet={pet} />))}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
