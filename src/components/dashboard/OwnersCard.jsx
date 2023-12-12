import ModalDashboard from './ModalDashboard'

function OwnersCard({ owner }) {

    const { name, surname, email, adoptedPets } = owner

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
                <ModalDashboard pets={adoptedPets} />
                </div>

            </div>

        </div>
    )
}

export default OwnersCard