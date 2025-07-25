import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// function AddCommentForm({ taskId, onCommentAdded }) {
//   const [commentText, setCommentText] = useState('');

//   const handleCommentSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(`http://localhost:8080/comments/task/${taskId}`, {
//         text: commentText,
//       });

//       if (response.status === 200) {

//         setCommentText('');

//         if (onCommentAdded) {
//           onCommentAdded(response.data);
//         }
//       } else {
//         console.error('Error adding comment:', response.status);
//       }
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

  

//   return (
//     <form onSubmit={handleCommentSubmit} className="mt-3">
//       <div className="form-group">
//         <textarea
//           className="form-control"
//           id="commentText"
//           rows="3"
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <button type="submit" style={{marginTop: '20px' }}className="btn btn-primary">
//         Add Comment
//       </button>
//     </form>
//   );
// }

function AddCommentForm({ taskId, updateComments }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/comments/task/${taskId}`, {
        text: commentText,
      });

      if (response.status === 200) {
        setCommentText('');
        updateComments(); // Оновлення списку коментарів після додавання нового
      } else {
        console.error('Error adding comment:', response.status);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mt-3">
      <div className="form-group">
        <textarea
          className="form-control"
          id="commentText"
          rows="3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" style={{marginTop: '20px'}} className="btn btn-primary">
        Add Comment
      </button>
    </form>
  );
}



export default AddCommentForm;