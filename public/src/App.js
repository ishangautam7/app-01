import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes, Switch, BrowserRouter, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const isAuthenitcated = () =>{
    return localStorage.getItem("login")!==null
  }

  const RedirectIfAuthenticated = ({children}) => {
    return isAuthenitcated() ? <Navigate to= "/home" replace/> : children;
  }

  const ProtectedRoute = ({children}) => {
    return isAuthenitcated() ? children: <Navigate to= "/login" replace/>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>}/>
          <Route path='/register' element={<RedirectIfAuthenticated><Register/></RedirectIfAuthenticated>}/>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
