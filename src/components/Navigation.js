import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;