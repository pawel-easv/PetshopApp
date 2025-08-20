import {useAtom} from "jotai";
import {AllPetsAtom} from "./atoms.ts";
import {useNavigate} from "react-router";
import {petDetailsPath} from "./App.tsx";

export const PetAvailability = {
    ALL: "all",
    SOLD: "sold",
    AVAILABLE: "available",
}


export default function PetsList({availability = PetAvailability.ALL}) {
    const [pets] = useAtom(AllPetsAtom);
    const filteredPets = pets.filter((pet) => {
        if (availability === PetAvailability.ALL) return true;
        else if (availability === PetAvailability.SOLD){
            return pet.sold;
        }
        else return !pet.sold;
    });
    const navigate = useNavigate();
    return (
        <>
            <div className="pets-list flex flex-col gap-8 mt-15">
                <h2 className={"text-black font-bold"}>{availability === PetAvailability.AVAILABLE ? <>Available Pets: </> : <>Pets: </>}</h2>
                <hr className={"text-black w-150 mb-5"} />
            {filteredPets.map((pet) =>(
                <div onClick={()=> navigate(petDetailsPath + pet.id)} className={"flex flex-col items-center"} key = {pet.id}>
                    <h2 className = "font-semibold text-black">{pet.name}</h2>
                    <img className={"w-100 cursor-pointer"} src = {pet.imgurl}/>
                </div>
            ))}
            </div>
        </>
    )
}