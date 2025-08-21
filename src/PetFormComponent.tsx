import { useState } from "react";
import { useSetAtom } from "jotai";
import { AllPetsAtom, type Pet } from "./atoms";
import { Api } from "../PetsApi.ts";
import {toast, Toaster} from "react-hot-toast";

const api = new Api();

export default function PetFormComponent() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [sold, setSold] = useState(false);
    const setPets = useSetAtom(AllPetsAtom);

    function resetForm() {
        setName("");
        setBreed("");
        setImageUrl("");
        setSold(false);
        toast.success("Pet has been successfully added!")
    }

    async function handleConfirm() {
        try {
            const response = await api.createPet.petCreatePet({
                name,
                breed,
                imgurl: imageUrl,
            });

            let newPet: Pet = {
                id: response.data.id ?? crypto.randomUUID(),
                name: response.data.name ?? "",
                breed: response.data.breed ?? "",
                imgurl: response.data.imgurl ?? "",
                sold: response.data.sold ?? false,
            };

            if (sold) {
                const updated = await api.updatePet.petUpdatePet({
                    ...newPet,
                    sold: true,
                });
                newPet = {
                    id: updated.data.id ?? newPet.id,
                    name: updated.data.name ?? newPet.name,
                    breed: updated.data.breed ?? newPet.breed,
                    imgurl: updated.data.imgurl ?? newPet.imgurl,
                    sold: updated.data.sold ?? true,
                };
            }

            setPets((prev: Pet[]) => [...prev, newPet]);
            resetForm();
        } catch (err) {
            toast.error("Failed to create the pet");
            console.error("Error creating pet:", err);
        }
    }

    return (
        <div className="w-[30vw] h-[65vh] mt-10 p-12 rounded-2xl bg-cream-200 flex flex-col gap-10 text-black">
            <h2 className="text-black font-semibold self-center">Pet Registration</h2>
            <input
                type="text"
                placeholder="Pet's name"
                className="input bg-cream-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Pet's breed"
                className="input bg-cream-100"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image's url"
                className="input bg-cream-100"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="flex gap-5 items-center">
                <input
                    type="checkbox"
                    className="checkbox bg-cream-100"
                    checked={sold}
                    onChange={(e) => setSold(e.target.checked)}
                />
                <span className="text-xs">Has been sold</span>
            </div>
            <button className="btn" onClick={handleConfirm}>
                Confirm
            </button>
            <Toaster/>
        </div>
    );
}
