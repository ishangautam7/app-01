import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NavigationBar() {

    const [profileState, setProfileState] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileState(false); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleProfileState = ()=>{
        setProfileState(!profileState)
    }

    const handleLogout = () =>{
        localStorage.removeItem("login")
        localStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <nav className="relative flex w-full h-16 lg:h-20 bg-blue-800 items-center px-4">
            <div className="lg:hidden flex items-center">
                <svg
                    className="h-8 w-8 text-white cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                >
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
            </div>

            <div className="flex-grow text-center lg:text-left lg:px-4">
                <h1 className="text-lg lg:text-2xl font-bold text-white">Logo</h1>
            </div>

            <div className="relative flex items-center justify-end">
                <img className="h-10 w-10 lg:h-12 lg:w-12 bg-black rounded-full cursor-pointer" alt="Profile" onClick={handleProfileState} />
                {profileState && (
                    <div ref={dropdownRef} className="dropdown-bar absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-lg z-50" style={{ transform: "translateY(10px)" }}>
                        <button className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200" onClick={()=>navigate('/profile')}>
                            Profile
                        </button>

                        <button className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200" onClick={()=>navigate('/update')}>
                            Update
                        </button>

                        <button className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}


export default NavigationBar;
