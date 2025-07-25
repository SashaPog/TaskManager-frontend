import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditTaskForm() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`);
        if (response.ok) {
          const taskDetails = await response.json();
          setTaskData({
            title: taskDetails.title,
            description: taskDetails.description,
            completed: taskDetails.completed,
          });
        } else {
          console.error('Error fetching task details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setTaskData({ ...taskData, [name]: checked });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        navigate(`/tasks/${taskId}`);
      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={taskData.completed}
              onChange={handleCheckboxChange}
              className="form-check-input"
            />
            <label htmlFor="completed" className="form-check-label">
              Completed
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTaskForm;