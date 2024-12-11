import { useLocation } from "react-router-dom";
import NavigationBar from "./Home/Navigation";
import { useEffect } from "react";
import {toast, ToastContainer} from "react-toastify"

const toastOptions = {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

function Home(){

    const location = useLocation()

    useEffect(() => {
        if (location.state?.successMessage) {
            toast.success(location.state.successMessage, toastOptions);
        }
    }, [location.state]);
    return(
        <div>
            <div className="w-full flex justify-center items-center">
                <NavigationBar></NavigationBar>
            </div>
                <ToastContainer/>
        </div>
    )
}

export default Home;