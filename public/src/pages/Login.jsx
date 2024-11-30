import '../index.css';
import '../App.css'
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import { loginRoute } from "../utils/apiRoutes";
import { toast, ToastContainer } from 'react-toastify'

function Login(){
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        password: ""
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
                const {username, password} = values;
                const {data} = await axios.post(loginRoute, {
                    username, password
                })
                if(!data.status){
                    toast.error(data.msg, toastOptions)
                }else if(data.status === true){
                    localStorage.setItem('login', JSON.stringify(data.user))
                    toast.success("Logged in Successfully", toastOptions)
                    navigate('/home')
                }
            }
        }catch(err){
            // console.log(err)
        }
    }

    const handleValidation = () =>{
        const {username, password} = values;
        if(username === ""){
            toast.error("Username cannot be empty", toastOptions)
            return false;
        }else if(password === ""){
            toast.error("Password cannot be empty", toastOptions)
            return false;
        }
        return true;
    }

    return(
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <form onSubmit={(e)=>{handleSubmit(e)}} className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>

                    <div className="h-full text-center">

                        <div className="text-3xl font-bold text-blue-500 p-4">Logo</div>

                        <div className='py-4 space-y-4 flex flex-col flex-grow justify-center'>
                            <input type="text" placeholder="Username" id="username" name="username" min="3" onChange={e => handleChange(e)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <input type="text" placeholder="Password" id="password" name="password" min="8" onChange={e => handleChange(e)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        
                        <div className='pt-4 pb-8 flex flex-col items-cemter w-full'>
                            <div className="mt-6 w-full">
                                <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>Login</button>
                            </div>

                            <div className="w-full mt-4 text-center text-grey-500">
                                <span className="">Don't have an account? <Link to="/register" className='hover:underline'>Register</Link></span>
                            </div>
                        </div>

                    </div>
                </form>
                <ToastContainer/>
        </div>
   ) 
}

export default Login
