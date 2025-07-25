import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${taskId}`);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
              <td>
                <Link to={`/tasks/${task.id}`} style={{marginRight: '20px' }} className="btn btn-info btn-sm mr-2">View Details</Link>
                <Link to={`/editTask/${task.id}`} style={{marginRight: '20px' }} className="btn btn-warning btn-sm mr-2">Edit Task</Link>
                <button 
                  onClick={() => handleDeleteTask(task.id)} 
                  className="btn btn-danger btn-sm">Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/createTask" className="btn btn-primary mt-3">Create Task</Link>
    </div>
  );
}

export default TaskList;