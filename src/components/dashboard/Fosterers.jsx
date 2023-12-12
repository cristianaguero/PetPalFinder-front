import FosterersCard from "./FosterersCard"

function Fosterers({ fosterers }) {
    return (
        <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-2 m-2 shadow-md">

            <h1 className="text-teal-800 font-black text-2xl text-center mb-5">Fosterers</h1>

            <div className="h-56 overflow-y-scroll">
                {fosterers.map(fosterer => (<FosterersCard key={fosterer._id} fosterer={fosterer} />))}
            </div>

        </div>
    )
}

export default Fosterers