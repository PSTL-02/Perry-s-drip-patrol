import React, { useContext } from 'react';
import { useLikesContext } from '../context/LikesContext';
import ListingDetails from '../components/ListingDetails';

const LikedListings = () => {
  const { likedListings } = useContext(useLikesContext);

  return (
    <div className='liked-listings'>
      <h2>Your Liked Listings</h2>
      {likedListings.length > 0 ? (
        likedListings.map((listing) => (
          <ListingDetails key={listing._id} listing={listing} />
        ))
      ) : (
        <p>No liked listings yet.</p>
      )}
    </div>
  );
};

export default LikedListings;
