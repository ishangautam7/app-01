function GoogleLogin(){
    const handleLogin = () =>{
        window.location.href = "http://localhost:3000/auth/google"
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Welcome to Our App
                </h1>
                <button onClick={handleLogin} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export default GoogleLogin