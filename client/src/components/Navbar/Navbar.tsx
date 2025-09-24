import { useNavigate } from "react-router";
import { handleLogout } from "../../utils/HandleLogout";



export default function Navbar() {

    const navigate = useNavigate()
    return (
        <nav className="bg-transparent border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">

                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#f5f5dc]">
                        BookStore
                    </span>
                </a>

                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm 
                               text-[#f5f5dc] rounded-lg md:hidden hover:bg-[#4e342e] 
                               focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-[#4e342e] 
                                   rounded-lg bg-[#4e342e] md:flex-row md:space-x-8 md:mt-0 
                                   md:border-0 md:bg-transparent">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-[#f5f5dc] bg-[#6d4c41] rounded-sm 
                                           md:bg-transparent md:text-[#d7a86e] md:p-0"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="block py-2 px-3 text-[#f5f5dc] rounded-sm 
                                           hover:bg-[#5d4037] md:hover:bg-transparent 
                                           md:border-0 md:hover:text-[#d7a86e] md:p-0"
                            >
                                About
                            </a>
                        </li>


                        <li className="block py-2 px-3 text-[#f5f5dc] rounded-sm 
                                           hover:bg-[#5d4037] md:hover:bg-transparent 
                                           md:border-0 md:hover:text-[#d7a86e] md:p-0 cursor-pointer"
                            onClick={() =>
                                navigate("/user")
                            }>
                            Profile
                        </li>

                        <li className="block py-2 px-3 text-[#f5f5dc] rounded-sm 
                                           hover:bg-[#5d4037] md:hover:bg-transparent 
                                           md:border-0 md:hover:text-[#d7a86e] md:p-0 cursor-pointer"
                            onClick={() => {
                                handleLogout();
                                navigate("/signin");
                            }}>
                            Logout
                        </li>

                        <li className="block py-2 px-3 text-[#f5f5dc] rounded-sm 
                                           hover:bg-[#5d4037] md:hover:bg-transparent 
                                           md:border-0 md:hover:text-[#d7a86e] md:p-0 cursor-pointer"
                            onClick={() => {
                                navigate("/cart")
                            }
                            }>
                            Cart
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
