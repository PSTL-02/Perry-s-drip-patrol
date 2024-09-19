import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const baseURL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

const ChatSection = ({ listingId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!listingId) {
      console.warn('Listing ID is not defined');
      return;
    }

    const fetchComments = async () => {
      try {
        const url = `${baseURL}/api/listings/${listingId}/comments`;
        console.log('Fetching comments from URL:', url);
        const response = await axios.get(url);
        console.log('Comments fetched:', response.data);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err.response?.data || err.message);
        setError('Failed to load comments. Please try again later.');
      }
    };

    fetchComments();
  }, [listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = `${baseURL}/api/listings/${listingId}/comments`;
      console.log('Posting comment to URL:', url);
      const response = await axios.post(url, {
        text: newComment,
        user_id: user.username,
      });

      console.log('Comment posted:', response.data);
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err.response?.data || err.message);
      setError('Failed to post comment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-section">
      <h3>Comments</h3>
      {error && <p className="error-message">{error}</p>}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <strong>{comment.user_id}:</strong> {comment.text}
              <p className="comment-time">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="4"
            disabled={loading}
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p>Please log in to post a comment.</p>
      )}
    </div>
  );
};

export default ChatSection;
