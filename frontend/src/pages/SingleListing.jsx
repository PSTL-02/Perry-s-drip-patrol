import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// icons
import { IoIosArrowBack } from 'react-icons/io';
// components
import SinglePageHeader from '../components/SinglePageHeader';
import HelpBubble from '../components/HelpBubble';

const SingleListing = () => {
    const navigate = useNavigate()

    // return to the top of the page
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <div className='navigation-buttons'>
        {/* back button */}
        <button className="primary-button back-button" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          Back
        </button>
        <HelpBubble/>
      </div>

      {/* single page header */}
      <SinglePageHeader />
    </>
  );
};

export default SingleListing;
