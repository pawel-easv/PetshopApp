import { AllPetsAtom } from "./atoms.ts";
import { useAtom } from "jotai";
import { useParams, useNavigate } from "react-router";
import { Api } from "../PetsApi.ts";

export type PetDetailsProps = {
    petId: string;
};

export default function PetDetails() {
    const petsApi = new Api();
    const [pets, setPets] = useAtom(AllPetsAtom);
    const params = useParams<PetDetailsProps>();
    const navigate = useNavigate();

    const pet = pets.find((p) => p.id === params.petId);

    if (!pet) return <div>Pet not found</div>;

    const deletePet = async (petId: string) => {
        try {
            await petsApi.deletePet.petDeletePet({ id: petId });
            setPets(pets.filter((p) => p.id !== petId));
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex gap-5 mt-10">
            <img src={pet.imgurl} className="w-100" />
            <ul className="list-unstyled flex flex-col gap-8 text-black">
                <li>
                    <span><b>Name: </b></span>
                    <span>{pet.name}</span>
                </li>
                <li>
                    <span><b>Breed: </b></span>
                    <span>{pet.breed}</span>
                </li>
                <li>
                    <span><b>Is available: </b></span>
                    <span>{pet.sold ? "No" : "Yes"}</span>
                </li>
                <li>
                    <button
                        onClick={() => deletePet(pet.id!)}
                        className="btn bg-red-400"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    );
}
