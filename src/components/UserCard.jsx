import { Link } from "react-router-dom"

function UserCard({ user }) {

    const { name, surname, email, phone, admin, confirmed, _id, createdAt, updatedAt } = user

    function handleClick() {
        localStorage.setItem('userToEdit', JSON.stringify(user))
    }

    return (
        <div className="border-solid border-2 border-teal-700 rounded-md p-2 m-2 shadow-md min-w-max">
            <h2 className="text-teal-700 font-bold text-2xl">{email}</h2>
            <p className="text-teal-700">ID: {_id}</p>
            <p className="text-teal-700">Name: {name}</p>
            <p className="text-teal-700">Surname: {surname}</p>
            <p className="text-teal-700">Phone: {phone}</p>
            <p className="text-teal-700">Admin: {admin ? 'Yes' : 'No'}</p>
            <p className="text-teal-700">Confirmed: {confirmed ? 'Yes' : 'No'}</p>
            <p className="text-teal-700 text-sm">Created at: {createdAt}</p>
            <p className="text-teal-700 text-sm">Updated at: {updatedAt}</p>

            <div className="flex flex-col md:flex-row justify-center items-center">
                <Link to='/admin/edit-user' className="w-36 mx-2 my-4 text-center transition-all cursor-pointer font-bold bg-teal-700 text-white rounded-md px-4 py-2 hover:bg-teal-800 hover:text-gray-300"
                onClick={handleClick}
                >Edit</Link>
                
            </div>
        </div>
    )
}

export default UserCard