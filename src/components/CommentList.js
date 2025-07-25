import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import AddCommentForm from './AddCommentForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// function CommentList({ taskId }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/comments/task/${taskId}`);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [taskId]);

//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:8080/comments/${commentId}`);
//       setComments(comments.filter(comment => comment.id !== commentId));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };


//   return (
//     <div className="container mt-4">
//       <h2>Comments</h2>
//       <ul className="list-group">
//         {comments.map(comment => (
//           <li key={comment.id} className="list-group-item">
//             <p>{comment.text}</p>
//             <button
//               onClick={() => deleteComment(comment.id)} // Викликати функцію видалення при натисканні на кнопку
//               className="btn btn-danger btn-sm mr-2"
//             >Delete Comment</button>
//             <Link to={`/editComment/${comment.id}`} className="btn btn-warning btn-sm">Edit Comment</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

function CommentList({ taskId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/comments/task/${taskId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [taskId]);

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const updateComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/comments/task/${taskId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error updating comments:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Comments</h2>
      <ul className="list-group">
        {comments.map(comment => (
          <li key={comment.id} className="list-group-item">
            <p>{comment.text}</p>
            <button
              onClick={() => deleteComment(comment.id)}
              className="btn btn-danger btn-sm mr-2"
            >Delete Comment</button>
            {/* <Link to={`/editComment/${comment.id}`} className="btn btn-warning btn-sm">Edit Comment</Link> */}
          </li>
        ))}
      </ul>
      <AddCommentForm taskId={taskId} updateComments={updateComments} />
    </div>
  );
}

export default CommentList;