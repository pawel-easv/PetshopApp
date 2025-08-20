import Hamburger from "hamburger-react";
import { useState } from "react";
import {useNavigate} from "react-router";
import LogoImage from "./assets/logo.png";
import {archivePath, petFormPath} from "./App.tsx";

export default function MenuComponent() {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className="w-10 cursor-pointer absolute top-12 text-black z-20">
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>

            <div
                className={`bg-cream-200 w-[60vw] h-36 left-72 top-0 absolute flex gap-20 items-center justify-center font-semibold text-white text-lg duration-500 ease-in-out
          ${isOpen ? "translate-y-0 opacity-100 z-10" : "-translate-y-full opacity-0 pointer-events-none"}
        `}
            >
                <button onClick={()=> {
                    navigate("/");
                    setOpen(false);

                }} className={"btn bg-cream-400 border-0 ml-10 w-25"}>Home</button>
                <button onClick={() =>{
                    navigate(archivePath);
                    setOpen(false);
                }} className={"btn bg-cream-400 border-0 w-25"}>Archive</button>

                <button onClick={()=>{
                    navigate(petFormPath);
                    setOpen(false)
                }} className={"btn bg-cream-400 border-0 w-25"}>Add Pet</button>
                <img
                    alt="Logo"
                    src={LogoImage}
                    className="w-32"
                />

            </div>
        </div>
    );
}
