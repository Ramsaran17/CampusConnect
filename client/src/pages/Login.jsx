import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      alert('Please enter your email')
      return
    }

    if (!password) {
      alert('Please enter your password')
      return
    }

    const users = JSON.parse(
      localStorage.getItem('campusUsers') || '[]'
    )

    const user = users.find(
      (existingUser) =>
        existingUser.email.toLowerCase() ===
          email.toLowerCase() &&
        existingUser.password === password
    )

    if (!user) {
      alert('Invalid email or password')
      return
    }

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    localStorage.setItem(
      'currentUser',
      JSON.stringify(loggedInUser)
    )

    alert(`Welcome, ${user.name}!`)

    navigate('/')
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to CampusConnect
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter password"
            />
          </div>

          <button
            className="auth-button"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{' '}

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login