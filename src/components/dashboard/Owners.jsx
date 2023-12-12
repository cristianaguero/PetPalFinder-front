import OwnersCard from "./OwnersCard"

function Owners({ owners }) {

    return (
        <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-2 m-2 shadow-md">
            <h1 className="text-teal-800 font-black text-2xl text-center mb-5">Owners</h1>

            <div className="h-56 overflow-y-scroll">
                {owners.map(owner => (<OwnersCard key={owner._id} owner={owner} />))}
            </div>

        </div>
    )
}

export default Owners