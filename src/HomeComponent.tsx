import {Outlet, useNavigate} from "react-router";
import LogoImage from "./assets/logo.png";
import MenuComponent from "./MenuComponent.tsx";
export default function HomeComponent() {

    const navigate = useNavigate();
    return (
        <div className ="w-screen h-full flex items-center justify-center content-center">
            <div className={"w-[60%] h-full min-h-screen bg-cream-100 flex flex-col items-center content-center"}>
                <div className="h-36 flex flex-row w-[100%] items-center justify-between">
                    <MenuComponent/>
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <img
                            onClick={() => navigate("/")}
                            alt="Logo"
                            src={LogoImage}
                            className="w-32 cursor-pointer"
                        />
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}