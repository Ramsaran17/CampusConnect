import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h2>CampusConnect</h2>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/lost-found">Lost & Found</Link>
        <Link to="/academic">Academic Resources</Link>
        <Link to="/events">Events</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar