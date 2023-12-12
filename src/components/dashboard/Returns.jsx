import ReturnsCard from "./ReturnsCard"

function Returns({ returns }) {
    
    return (
        <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-2 m-2 shadow-md">
            
            <h1 className="text-teal-800 font-black text-2xl text-center mb-5">Returns</h1>

            <div className="h-56 overflow-y-scroll">
                {returns && returns.map(returned => (<ReturnsCard key={returned._id} returned={returned} />))}
            </div>
        </div>
    )
}

export default Returns