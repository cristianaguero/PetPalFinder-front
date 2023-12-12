import AdminCard from "./AdminCard"



function Admins({ admins }) {

    return (
        <div className="border-solid border-2 border-teal-700 rounded-md p-2 m-2 shadow-md min-w-fit bg-gray-50">
            <h1 className="text-teal-800 font-black text-2xl text-center mb-5">Admins</h1>

            <div className="h-60 overflow-y-scroll">
                {admins.map(admin => (<AdminCard key={admin._id} admin={admin} />))}
            </div>

        </div>
    )
}

export default Admins