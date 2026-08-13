import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  )

  const handleLogout = () => {
    localStorage.removeItem('currentUser')

    setCurrentUser(null)

    navigate('/')
  }

  return (
    <nav className="navbar">

      <h2>CampusConnect</h2>

      <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/marketplace">
          Marketplace
        </Link>

        <Link to="/lost-found">
          Lost & Found
        </Link>

        <Link to="/academic">
          Academic Resources
        </Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/messages">
          Messages
        </Link>

        {currentUser ? (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar