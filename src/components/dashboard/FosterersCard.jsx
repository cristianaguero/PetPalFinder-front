import ModalDashboard from "./ModalDashboard"

function FosterersCard({ fosterer }) {

    const { name, surname, email, fosteredPets } = fosterer

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
            <ModalDashboard pets={fosteredPets} />
            </div>

        </div>

    </div>
    )
}

export default FosterersCard