import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// components
import Navbar from './components/Navbar'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import Home from './pages/Home';

const App = () => {
  const {user} = useAuthContext();
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>
          <Route path='/login' element={user ? <Login/> : <Navigate to='/login'/>}/>
          <Route path='/signup' element={user ? <SignUp/> : <Navigate to='/signup'/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
