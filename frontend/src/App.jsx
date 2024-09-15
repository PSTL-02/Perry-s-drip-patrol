import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Navbar from './components/Navbar'

import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  const {user} = useAuthContext();
  
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/login' element={user ? <Login/> : <Navigate to='/login'/>}/>
        <Route path='/signup' element={user ? <SignUp/> : <Navigate to='/signup'/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
