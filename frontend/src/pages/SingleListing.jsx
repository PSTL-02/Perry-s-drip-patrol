import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import SinglePageHeader from '../components/SinglePageHeader';
// import ChatSection from '../components/ChatSection';

const SingleListing = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the listingId from the URL

  // console.log('listingId from URL params:', id); // Log to make sure you're getting the correct id

  return (
    <>
      {/* back button */}
      <button className="primary-button back-button" onClick={() => navigate(-1)}>
        <IoIosArrowBack />
        Back
      </button>

      {/* single page header */}
      <SinglePageHeader />

      {/* chat */}
      {/* <ChatSection listingId={id} /> */}
    </>
  );
};

export default SingleListing;
