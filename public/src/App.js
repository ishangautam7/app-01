import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes, Switch, BrowserRouter, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import VerifyUpdate from './pages/VerifyUpdate';
import Update from './pages/Update'

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
          <Route path='/verify' element={<ProtectedRoute><VerifyUpdate /></ProtectedRoute>}/>
          <Route path='/update' element={<ProtectedRoute><Update/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
