import { Link } from "react-router-dom" 

function AdminCard({ admin }) {

    const { name, surname, email } = admin

    function handleClick() {
        localStorage.setItem('userToEdit', JSON.stringify(admin))
    }

    return (
        <div className="space-y-8 mb-4 w-72 bg-gray-100 p-2 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <div className="ml-4 space-y-1">
                    <p className="font-medium leading-none">{surname}, {name}</p>

                    <p className="text-sm text-muted-foreground">
                        {email}
                    </p>
                </div>

                <div className="ml-4 space-y-1">
                <Link to='/admin/edit-user' className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                onClick={handleClick}
                >Edit</Link>
                </div>

            </div>
        </div>
    )
}

export default AdminCard