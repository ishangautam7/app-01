import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate()

    const handleLogOut = () =>{
        localStorage.removeItem("login")
        navigate('/login')
    }
    return(
        <div className="h-full w-full flex justify-center items-center">
            <button className="p-6" onClick={()=>navigate('/verify')}>Verify</button>
            <button className="p-6" onClick={()=>navigate('/update')}>Update</button>
            <button className="p-6" onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default Home;