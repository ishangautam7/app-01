import '../index.css';
import '../App.css'
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import { registerRoute } from "../utils/apiRoutes";
import { toast, ToastContainer } from 'react-toastify'

function Login(){
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleChange =(event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const handleSubmit =async (e) =>{
        try{
            e.preventDefault()
            if(handleValidation()){
                const {username, email, password} = values;
                const {data} = await axios.post(registerRoute, {
                    username, email, password
                })
                if(data.status === true){
                    toast.success("Account created successfully", toastOptions)
                    navigate('/login')
                }else{
                    toast.error(data.msg, toastOptions)
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const handleValidation = () =>{
        const {username, email, password, confirmPassword} = values;
        if(username === ""){
            toast.error("Username cannot be empty", toastOptions)
            return false;
        }else if(email === ""){
            toast.error("Email cannot be empty", toastOptions)
            return false;
        }else if(password === ""){
            toast.error("Password cannot be empty", toastOptions)
            return false;
        }else if(password !== confirmPassword){
            toast.error("Password and Confirm Password donot match", toastOptions)
            return false;
        }
        return true;
    }

    return(
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <form onSubmit={(e)=>{handleSubmit(e)}} className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
                    <div className="text-center mb-6">
                        <div className="text-3xl font-bold mb-6 text-blue-500">Logo</div>
                        <div className='space-y-4 mb-4'>
                            <input type="text" placeholder="Username" id="username" name="username" min="3" onChange={e => handleChange(e)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <input type="text" placeholder="Email" id='email' name='email' onChange={e=>handleChange(e)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <input type="text" placeholder="Password" id="password" name="password" min="8" onChange={e => handleChange(e)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <input type="text" placeholder="Confirm Password" id="confirPassword" name="confirmPassword" min="8" onChange={e => handleChange(e)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        
                        <div className='h-full my-6'>
                            <div className="">
                                <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>Register</button>
                            </div>

                            <div className="my-4 text-center text-grey-500">
                                <span className="">Already have an Account? <Link to="/login" cla>Login</Link></span>
                            </div>
                        </div>

                    </div>
                </form>
                <ToastContainer/>
        </div>
   ) 
}

export default Login
