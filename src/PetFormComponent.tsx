import {useState} from "react";

export default function PetFormComponent() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [sold, setSold] = useState(false);




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
            <button className="btn">
                Confirm
            </button>
        </div>
    );
}
