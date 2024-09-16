import React from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
// icons
import { IoHeartOutline } from "react-icons/io5";
import { TbTags } from "react-icons/tb";

const Navbar = () => {
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
                        <IoHeartOutline className='nav-icons'/>
                        <TbTags className='nav-icons'/>
                        <button className='primary-button' onClick={handleClick}>Logout</button>
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
