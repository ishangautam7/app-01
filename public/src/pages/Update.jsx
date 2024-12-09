import { useState, useEffect } from "react"
import { getInfo } from "../utils/apiRoutes"
import axios from "axios"
import { update } from "../utils/apiRoutes"
import {toast, ToastContainer} from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

const toastOptions = {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

function Update(){
    const navigate = useNavigate()
    const location = useLocation()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        if (location.state?.successMessage) {
            toast.success(location.state.successMessage, toastOptions);
        }
    }, [location.state]);

    const updateData = async(e) =>{
        e.preventDefault()
        const loginData = localStorage.getItem("login")
        const parsedId = JSON.parse(loginData)
        const id = parsedId.id
        const token = localStorage.getItem("token")
        try{
            const {data} = await axios.put(update, {
                id, ...values
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(data.status === true){
                toast.success("Updated Successfully", toastOptions)
                navigate('/home')
            }else{
                toast.error(data.msg, toastOptions)
            }
        }catch(err){
            console.log(err)
        }
    }

    const getInfoUser = async () =>{
        const loginData = localStorage.getItem("login")
        const parsedId = JSON.parse(loginData)
        const id = parsedId.id
        const token = localStorage.getItem("token")
        const {data} = await axios.post(getInfo, {id}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        if(data.status === true){
            setValues({
                username: data.user.username,
                email: data.user.email,
                password: ""
            })
        }
    }

    useEffect(() => {
        getInfoUser();
    }, []);

    const handleChange =(event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    return(
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Update</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700" > Username </label>
                        <input type="text" name="username" id="username" placeholder="Enter your username" className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300" onChange={handleChange} value={values.username}/>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700" > Email </label>
                        <input type="text" name="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300" onChange={handleChange} value={values.email}/>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700" > Password </label>
                        <input type="text" name="password" id="password" placeholder="********" className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300" onChange={handleChange} value={values.password} onFocus={(event) => event.target.select()}/>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" onClick={updateData}>Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>

    )
}

export default Update