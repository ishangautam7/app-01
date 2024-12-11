import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes, Switch, BrowserRouter, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import VerifyUpdate from './pages/VerifyUpdate';
import Update from './pages/Update'
import ProtectedRoute from './utils/routeGuard';
import Profile from './pages/Home/Profile';
import GoogleLogin from './pages/GoogleLogin';

function App() {
  const isAuthenitcated = () =>{
    return localStorage.getItem("token")!==null
  }

  const RedirectIfAuthenticated = ({children}) => {
    return isAuthenitcated() ? <Navigate to= "/home" replace/> : children;
  }

  const ProtectRoute = ({children}) => {
    return isAuthenitcated() ? children: <Navigate to= "/login" replace/>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>}/>
          <Route path='/login' element={<RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>}/>
          <Route path='/register' element={<RedirectIfAuthenticated><Register/></RedirectIfAuthenticated>}/>
          <Route path='/home' element={<ProtectRoute><Home/></ProtectRoute>}/>
          <Route path='/profile' element={<ProtectRoute><Profile/></ProtectRoute>}/>
          <Route path='/verify' element={<ProtectRoute><VerifyUpdate /></ProtectRoute>}/>
          <Route path='/update' element={<ProtectRoute><ProtectedRoute><Update/></ProtectedRoute></ProtectRoute>} />
          <Route path='/google' element={<RedirectIfAuthenticated><GoogleLogin/></RedirectIfAuthenticated>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
