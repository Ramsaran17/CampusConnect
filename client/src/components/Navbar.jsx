import './Navbar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Maps each navbar item to its card on the Home page. Clicking these
// in the navbar takes you to Home and scrolls to that card instead of
// jumping straight to the section — the card itself is what navigates
// to the real page.
const homeSections = {
  '/marketplace': 'section-marketplace',
  '/lost-found': 'section-lost-found',
  '/academic': 'section-academic',
  '/events': 'section-events',
  '/messages': 'section-messages',
  '/profile': 'section-profile',
}

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  )

  const handleLogout = () => {
    localStorage.removeItem('currentUser')

    setCurrentUser(null)

    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link'

  const handleSectionClick = (path) => (e) => {
    const sectionId = homeSections[path]

    if (!sectionId) return

    e.preventDefault()

    if (location.pathname === '/') {
      // Already on Home — just scroll to the card and flash it.
      const el = document.getElementById(sectionId)

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('feature-card-highlight')

        setTimeout(() => {
          el.classList.remove('feature-card-highlight')
        }, 1600)
      }
    } else {
      // Navigate to Home and let Home.jsx handle the scroll once
      // the cards have rendered.
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  return (
    <nav className="navbar">

      <h2>CampusConnect</h2>

      <div className="navbar-links">

        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>

        <NavLink
          to="/marketplace"
          className={linkClass}
          onClick={handleSectionClick('/marketplace')}
        >
          Marketplace
        </NavLink>

        <NavLink
          to="/lost-found"
          className={linkClass}
          onClick={handleSectionClick('/lost-found')}
        >
          Lost & Found
        </NavLink>

        <NavLink
          to="/academic"
          className={linkClass}
          onClick={handleSectionClick('/academic')}
        >
          Academic Resources
        </NavLink>

        <NavLink
          to="/events"
          className={linkClass}
          onClick={handleSectionClick('/events')}
        >
          Events
        </NavLink>

        <NavLink
          to="/messages"
          className={linkClass}
          onClick={handleSectionClick('/messages')}
        >
          Messages
        </NavLink>

        {currentUser ? (
          <>
            <NavLink to="/saved" className={linkClass}>
              Saved
            </NavLink>

            <NavLink
              to="/profile"
              className={linkClass}
              onClick={handleSectionClick('/profile')}
            >
              Profile
            </NavLink>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>

            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar