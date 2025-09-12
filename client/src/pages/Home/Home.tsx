import About from "../../components/About/About"
import Navbar from "../../components/Navbar/Navbar"
import DisplayBooks from "../DisplayBooks/DisplayBooks"


function Home() {

    return (
        <>
            <Navbar />
            <About />
            <DisplayBooks />
        </>
    )
}

export default Home