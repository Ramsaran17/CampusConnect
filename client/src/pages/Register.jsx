import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    if (!email.trim()) {
      alert('Please enter your email')
      return
    }

    if (!password) {
      alert('Please enter a password')
      return
    }

    if (password.length < 6) {
      alert('Password must contain at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const existingUsers = JSON.parse(
      localStorage.getItem('campusUsers') || '[]'
    )

    const userAlreadyExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )

    if (userAlreadyExists) {
      alert('An account with this email already exists')
      return
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    }

    localStorage.setItem(
      'campusUsers',
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    )

    alert('Registration successful!')

    navigate('/login')
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join your campus community
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
            />
          </div>

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

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Confirm password"
            />
          </div>

          <button
            className="auth-button"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{' '}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Register