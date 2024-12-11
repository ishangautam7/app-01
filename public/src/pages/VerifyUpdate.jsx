import axios from "axios"
import { useState } from "react"
import { verifyPassword } from "../utils/apiRoutes"
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';

function VerifyUpdate (){

    const navigate = useNavigate()
    const [values, setValues] = useState({
        password: ""
    })

    const handleChange =(event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleSubmit = () =>{
        const {password} = values;
        if(password === ""){
            toast.error("Password cannot be empty", toastOptions)
            return false
        }else if(password.length<8){
            toast.error("Password must be of 8 character", toastOptions)
            return false
        }return true
    }

    const VerifyPassword = async (e) => {
        e.preventDefault();
        try {
            if (handleSubmit()) {
                const { password } = values;
                const token = localStorage.getItem("token");
    
                const user = jwtDecode(token)

                if (!user) {
                    toast.error("User login information is missing!", toastOptions);
                    return;
                }
    
                const id = user._id;
                if (!id) {
                    toast.error("User ID is missing in login information!", toastOptions);
                    return;
                }
                console.log(id)
    
                // Make API request
                const { data } = await axios.post(
                    verifyPassword,
                    { password, id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(data)
                // Handle response
                if (data.status === true) {
                    navigate("/update", { state: { successMessage: data.msg } });
                } else if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }
            }
        } catch (err) {
            // console.error("Error verifying password:", err);
            toast.error("An error occurred while verifying the password.", toastOptions);
        }
    };
    

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify</h1>
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="password"
                        placeholder="Enter your Password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        onClick={VerifyPassword}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Verify
                    </button>
                </div>
            <ToastContainer />
        </div>
    </div>

    )
}

export default VerifyUpdate