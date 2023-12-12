import { Chart } from "react-google-charts";

function Cake({ allPets }) {

    const adoptedPets = allPets.filter(pet => pet.status === 'adopted')
    const fosteredPets = allPets.filter(pet => pet.status === 'fostered')
    const availablePets = allPets.filter(pet => pet.status === 'available')
    const toBeReturnedPets = allPets.filter(pet => pet.toBeReturned === true)

    const data = [
        ["Pets", "Status"],
        ["Adopted", adoptedPets.length],
        ["To Be Returned", toBeReturnedPets.length],
        ["Fostered", fosteredPets.length],
        ["Available", availablePets.length]

    ];

    const options = {
        legend: "none",
        pieSliceText: "label",
        pieStartAngle: 100,
    };



    return (
        <div className="border-solid border-2 bg-gray-50 border-teal-700 rounded-md p-2 m-2 shadow-md">
            <h1 className="text-teal-800 font-black text-2xl text-center mb-5">Pets Status</h1>

            <div className="h-60 overflow-hidden flex justify-center items-center">
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"260px"}
                />
            </div>

        </div>
    )
}

export default Cake