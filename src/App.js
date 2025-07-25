
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import CreateTaskForm from './components/CreateTaskForm';
import EditTaskForm from './components/EditTaskForm';
import Navigation from './components/Navigation';


function App() {
  
  return (
    <Router>
      <div>
      <Navigation /> {}
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            <Route path="/createTask"  element={<CreateTaskForm />} />
            <Route path="/editTask/:taskId" element={<EditTaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
