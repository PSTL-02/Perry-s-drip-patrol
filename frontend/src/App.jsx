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
import { useState } from 'react';

const App = () => {
  const {user} = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  
  return (
    <>
      <BrowserRouter>
        <Navbar setShowForm={setShowForm} searchTerm={searchTerm} handleSearch={handleSearch} />
        <Routes>
        <Route exact path='/' element={<Home showForm={showForm} setShowForm={setShowForm}/>}/>
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
