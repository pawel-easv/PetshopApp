import {AllPetsAtom, type Pet} from "./atoms.ts";
import { useAtom } from "jotai";
import { useParams, useNavigate } from "react-router";
import { Api } from "../PetsApi.ts";
import {toast, Toaster} from "react-hot-toast";

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

    async function deletePet (petId: string){
        try {
            await petsApi.deletePet.petDeletePet({ id: petId });
            setPets(pets.filter((p) => p.id !== petId));
            navigate("/")
            toast.success("Pet deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete the pet");
        }
    }

    async function movePetToSold(pet: Pet) {
        try{
             const response = await petsApi.updatePet.petUpdatePet({
                 id: pet.id,
                 name: pet.name,
                 breed: pet.breed,
                 imgurl: pet.imgurl,
                 sold: true
            });
             const updatedPet = await response.json();

             const updatedPets = pets.filter((p) => p.id !== pet.id);
             setPets([...updatedPets, updatedPet]);
             toast.success("Pet moved successfully");
             navigate("/");

        } catch(err){
            toast.error("Failed to move the pet to the archive");
            console.error(err);
        }
    }

    return (
        <div className="flex gap-5 mt-10">
            <img src={pet.imgurl} className="w-100" />
            <ul className="list-unstyled flex flex-col gap-7 text-black">
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
                <li>
                    <button
                        onClick={() => movePetToSold(pet)}
                        className="btn bg-cream-400"
                    >
                        Move to archive
                    </button>
                </li>
            </ul>
            <Toaster/>
        </div>
    );
}
