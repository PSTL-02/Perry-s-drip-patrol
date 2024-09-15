import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div className='footer-logo'>
            {/* <Link to='/'>
                <img className='nav-logo-image' src='./public/logo.png' alt='platypus gradient logo' />&copy;
            </Link> */}
            <img className='nav-logo-image' src='./public/logo.png' alt='platypus gradient logo' />&copy;
        </div>
        <div className='footer-content'>
            <p>Help & Support</p>
            <span/>
            <p>Privacy Policy</p>
            <span/>
            <p>Terms & Conditions</p>
        </div>
    </footer>
  )
}

export default Footer
