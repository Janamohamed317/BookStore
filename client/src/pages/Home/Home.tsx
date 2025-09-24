import About from "../../components/About/About"
import Navbar from "../../components/Navbar/Navbar"
import DisplayBooks from "../DisplayBooks/DisplayBooks"


function Home() {

    return (
        <div className="h-full">
            <Navbar />
            <About />
            <DisplayBooks />
        </div>
    )
}

export default Home