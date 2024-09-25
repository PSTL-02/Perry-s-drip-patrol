import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// components
import Navbar from './components/Navbar'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import SingleListing from './pages/SingleListing';
import Home from './pages/Home';

const App = () => {
  const {user} = useAuthContext();
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          {/* login */}
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          {/* signup */}
          <Route path='/signup' element={!user ? <SignUp/> : <Navigate to='/'/>}/>
          {/* single page */}
          <Route path='/:id' element={user ? <SingleListing/> : <Navigate to='/login'/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
