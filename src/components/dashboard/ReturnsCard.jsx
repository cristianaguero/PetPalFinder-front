import { Link } from "react-router-dom" 

function ReturnsCard({ returned }) {

    const { name, type, picture, ownerId, fostererId } = returned

    const handleClick = () => {
        if(!ownerId && !fostererId) {
            returned.ownerId = ''
            returned.fostererId = ''
        } 

        if(ownerId) {
            returned.ownerId = ownerId._id
        }

        if(fostererId) {
            returned.fostererId = fostererId._id
        }

        localStorage.setItem('petToEdit', JSON.stringify(returned))
    }

    return (
        <div className="space-y-8 mb-4 w-full bg-gray-100 p-2 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <img src={picture} alt="pet picture" className="w-20 rounded-full" />
                <div className="ml-4 space-y-1">
                    <p className="font-medium leading-none">{name}</p>

                    <p className="text-sm text-muted-foreground">
                        {type}
                    </p>
                </div>

                {ownerId && <div className="ml-4 space-y-1">
                    <p className="font-medium leading-none">Owner: {ownerId.name} {ownerId.surname}</p>

                    <p className="text-sm text-muted-foreground">
                        {ownerId.email}
                    </p>
                </div>}

                {fostererId && <div className="ml-4 space-y-1">
                    <p className="font-medium leading-none">Fosterer: {fostererId.name} {fostererId.surname}</p>

                    <p className="text-sm text-muted-foreground">
                        {fostererId.email}
                    </p>
                </div>}

                <div className="ml-4 space-y-1">
                <Link to='/admin/edit-pet' className=" text-center transition-all cursor-pointer text-sm bg-red-700 text-white rounded-md px-4 py-2 hover:bg-red-800 hover:text-gray-300"
                    onClick={handleClick}
                >Handle return</Link>
                </div>

            </div>
        </div>
    )
}

export default ReturnsCard