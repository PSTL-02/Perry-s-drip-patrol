import React from 'react'
import { useNavigate } from 'react-router-dom';
// icons
import { IoIosArrowBack } from "react-icons/io";
// components
import SinglePageHeader from '../components/SinglePageHeader';

const SingleListing = () => {
    const navigate = useNavigate();

  return (
    <>
        {/* back button */}
        <button className='primary-button' onClick={() => navigate(-1)}>
            <IoIosArrowBack />
            Back
        </button>

        {/* single page header */}
        <SinglePageHeader/>
    </>
  )
}

export default SingleListing
