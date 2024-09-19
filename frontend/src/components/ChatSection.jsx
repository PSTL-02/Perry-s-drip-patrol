import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext to manage user auth state

const ChatSection = ({ listingId }) => {
    const [comments, setComments] = useState([]); // Ensure comments start as an array
    const [newComment, setNewComment] = useState('');
    const { user } = useContext(AuthContext); // Get the logged-in user from context

    useEffect(() => {
        // Fetch comments when the component mounts
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/listings/${listingId}`);
                
                // Ensure response.data is an array
                if (Array.isArray(response.data)) {
                    setComments(response.data);
                } else {
                    setComments([]); // If the response is not an array, set comments to an empty array
                }
            } catch (error) {
                console.error('Failed to fetch comments:', error);
                setComments([]); // Handle errors by setting comments to an empty array
            }
        };
        fetchComments();
    }, [listingId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to comment.');
            return;
        }

        try {
            const response = await axios.post(`/api/comments/listings/${listingId}/comments`, {
                text: newComment,
                user_id: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Send the JWT token in the header
                },
            });

            // Clear the input and update comments
            setNewComment('');
            setComments([...comments, response.data]);
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    return (
        <div className="chat-section">
            <h2>Comments</h2>
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>{comment.text}</p>
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>

            {/* Only show the comment form to logged-in users */}
            {user && (
                <form onSubmit={handleCommentSubmit} className="chat-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Type your message here..."
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
};

export default ChatSection;
