import UserCard from "./UserCard"

function UserCardContainer({users}) {

    return (
        <div className='flex flex-wrap md:mx-auto pb-10'>
            {users.map(user => (<UserCard key={user._id} user={user} />))}
        </div>


    )
}

export default UserCardContainer