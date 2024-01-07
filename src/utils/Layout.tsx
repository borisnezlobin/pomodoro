import { useContext } from "react";
import { MainPage } from "../pages/main";
import { CurrentSessionContext } from "../context";

export const Layout: React.FC = () => {
    const { currentSession } = useContext(CurrentSessionContext);

    return (

        <div className={`w-full h-full ${(currentSession && currentSession.type == "break") ? "bg-red-100" : "bg-white"}`}>
            <MainPage />
        </div>
    );
}