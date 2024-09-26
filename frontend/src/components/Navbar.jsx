import React from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
// icons
import { FaHeart } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";

const Navbar = ({setShowForm}) => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <nav>
            {/* nav logo */}
            <div className='nav-logo'>
                <Link to='/'>
                    <img className='nav-logo-image' src='./public/logo.png' alt='platypus gradient logo' />
                </Link>
            </div>

            {/* nav links and icons */}
            <div className='nav-content'>
                {user ? (
                    <>
                        <span className='username'>{user.username}</span>
                        <BiLogOut className='nav-icons' onClick={handleClick}/>
                        {/* <FaHeart className='nav-icons'/> */}
                        {/* <FaTags className='nav-icons'/> */}
                        <FaRegListAlt className='nav-icons'/>
                        <button className='primary-button' onClick={() => setShowForm(showForm => !showForm)}>Create a listing</button>
                    </>
                ) : (
                    <>
                        <Link to='/login'><button className='primary-button'>Login</button></Link>
                        <Link to='/signup'><button className='primary-button'>Signup</button></Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
