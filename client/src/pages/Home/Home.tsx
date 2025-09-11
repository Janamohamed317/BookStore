import { useContext } from "react";
import DisplayBooks from "../DisplayBooks/DisplayBooks"
import { AppContext } from "../../components/Context/AppContext";


function Home() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("DisplayBooks must be used within an AppContextProvider");
    }
    const { handleLogout } = context;

    return (
        <div>
            <DisplayBooks />
            <button onClick={handleLogout} className="cursor-pointer">Log Out</button>
        </div>
    )
}

export default Home