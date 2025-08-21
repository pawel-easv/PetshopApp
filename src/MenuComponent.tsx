import Hamburger from "hamburger-react";
import { useState } from "react";
import {useNavigate} from "react-router";
import LogoImage from "./assets/logo.png";
import {archivePath, petFormPath} from "./App.tsx";

export default function MenuComponent() {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="w-[100%] flex align-middle items-center">
            <div className="w-10 cursor-pointer absolute top-12 ml-5 text-black z-20">
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>

            <div
                className={`bg-cream-200 w-[100%] h-36 flex gap-[10%] items-center justify-center font-semibold text-white text-lg duration-500 ease-in-out
          ${isOpen ? "translate-y-0 opacity-100 z-10" : "-translate-y-full opacity-0 pointer-events-none"}
        `}
            >
                <button onClick={()=> {
                    navigate("/");
                    setOpen(false);

                }} className={"btn bg-cream-400 border-0 ml-10 w-[12%]"}>Home</button>
                <button onClick={() =>{
                    navigate(archivePath);
                    setOpen(false);
                }} className={"btn bg-cream-400 border-0 w-[12%]"}>Archive</button>

                <button onClick={()=>{
                    navigate(petFormPath);
                    setOpen(false)
                }} className={"btn bg-cream-400 border-0 w-[12%]"}>Add Pet</button>
                <img
                    alt="Logo"
                    src={LogoImage}
                    className="w-32"
                />

            </div>
        </div>
    );
}
