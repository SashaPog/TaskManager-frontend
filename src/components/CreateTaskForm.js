import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8080/tasks';

function CreateTaskForm() {
  
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setTaskData({ ...taskData, [name]: checked });
  };



  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     console.log(JSON.stringify(taskData));
  
  //     const response = await fetch(API_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(taskData),
  //     });
  
  //     if (response.ok) {
  //       history.push('/');
  //     } else {
  //       console.error('Error creating task:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error creating task:', error);
  //   }
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        navigate(`/`);
      } else {
        console.error('Error creating task:', response.status);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };



  return (
    <div>
      <h2>Create Task</h2>
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
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTaskForm;