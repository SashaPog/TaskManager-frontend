import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function TaskDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  return (
    <div style={{ margin: 'auto' }}>
      <h1>View Task</h1>
      <div style={{ marginBottom: '20px' }}>
        <h3>Title:</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{task.title}</p>
        <h3>Description:</h3>
        <p>{task.description}</p>
        <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
        {/* <Link to={`/editTask/${taskId}`} className="btn btn-warning btn-sm">Edit Task</Link> */}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <CommentList taskId={taskId} />
      </div>
    </div>
  );
}

export default TaskDetails;