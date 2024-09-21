import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useListingContext } from '../hooks/useListingContext';
import {formatDistanceToNow} from 'date-fns';
// icons
import { IoPaperPlaneOutline } from "react-icons/io5";

const ChatSection = () => {
  const { dispatch } = useListingContext();
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [commentText, setCommentText] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user?.username;

  // fetch listing by id
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  const handleAddComment = async () => {
    try {
      if (!listing?._id) {
        console.error('Listing ID is missing');
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/comments/listings/${listing._id}/comments`,
        {
          text: commentText,
          user_id: user_id,
        }
      );

      if (response.status === 201) {
        const newComment = response.data;
        const updatedComments = [...(listing?.comments || []), newComment];
        const updatedListing = { ...listing, comments: updatedComments };

        setListing(updatedListing);
        dispatch({ type: 'UPDATE_LISTING', payload: updatedListing });
        setCommentText('');
      }
    } catch (error) {
      console.error('Error Adding Comment: ', error);
    }
  };

  return (
    <>
      {/* chat section */}
      <div className="chat-section">
        <h2>Chat with the seller</h2>
        {/* comments coontainer */}
        <div className="comments">
          {listing?.comments?.length > 0 ? (
            listing.comments.map((comment) => (
              <div key={comment._id} className="comment">
              {/* individual comment */}
                <div className='comment-user-details'>
                    <h5>{comment.user_id}</h5>
                </div>
                <div className='comment-details'>
                    <p>{comment.text}</p>
                    <span className='comment-date'>Sent {formatDistanceToNow(new Date(comment.createdAt), {includeSeconds: false, addSuffix: true})}</span>
                </div>
              </div>
            ))
          ) : (
            <p className='empty-comments-alert'>Be the first to comment!</p>
          )}
        </div>

        {/* add comment */}
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className='submit-comment' onClick={handleAddComment}>
            <IoPaperPlaneOutline />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatSection;