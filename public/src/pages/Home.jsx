import { useNavigate } from "react-router-dom";
import NavigationBar from "./Home/Navigation";

function Home(){
    return(
        <div>
            <div className="w-full flex justify-center items-center">
                <NavigationBar></NavigationBar>
            </div>
        </div>
    )
}

export default Home;