import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [hostel, setHostel] = useState('')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    )

    const savedProfile = JSON.parse(
      localStorage.getItem('studentProfile') || 'null'
    )

    if (savedProfile) {
      setName(savedProfile.name || '')
      setEmail(savedProfile.email || '')
      setDepartment(savedProfile.department || '')
      setYear(savedProfile.year || '')
      setHostel(savedProfile.hostel || '')
      setBio(savedProfile.bio || '')
      setProfileImage(savedProfile.profileImage || null)
    } else if (currentUser) {
      setName(currentUser.name || '')
      setEmail(currentUser.email || '')
    }
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setProfileImage(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSave = (event) => {
    event.preventDefault()

    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    if (!email.trim()) {
      alert('Please enter your email')
      return
    }

    const profile = {
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      year,
      hostel: hostel.trim(),
      bio: bio.trim(),
      profileImage,
    }

    localStorage.setItem(
      'studentProfile',
      JSON.stringify(profile)
    )

    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    )

    if (currentUser) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          ...currentUser,
          name: name.trim(),
          email: email.trim(),
        })
      )
    }

    setIsEditing(false)

    alert('Profile updated successfully!')
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-photo-section">

            <div className="profile-photo">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                />
              ) : (
                <span>
                  {name
                    ? name.charAt(0).toUpperCase()
                    : 'U'}
                </span>
              )}
            </div>

            {isEditing && (
              <label className="photo-upload">
                Change Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}

          </div>

          <div className="profile-heading">
            <h1>{name || 'Student Profile'}</h1>

            <p>
              {department || 'Department not added'}
            </p>
          </div>

          {!isEditing && (
            <button
              className="edit-profile-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form
            className="profile-form"
            onSubmit={handleSave}
          >

            <div className="profile-form-grid">

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
                <label>Department</label>

                <input
                  type="text"
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                  placeholder="Example: ECE"
                />
              </div>

              <div className="form-group">
                <label>Year</label>

                <select
                  value={year}
                  onChange={(event) =>
                    setYear(event.target.value)
                  }
                >
                  <option value="">
                    Select year
                  </option>

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>

                  <option value="Postgraduate">
                    Postgraduate
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Hostel</label>

                <input
                  type="text"
                  value={hostel}
                  onChange={(event) =>
                    setHostel(event.target.value)
                  }
                  placeholder="Example: Hostel 5"
                />
              </div>

              <div className="form-group full-width">
                <label>Bio</label>

                <textarea
                  value={bio}
                  onChange={(event) =>
                    setBio(event.target.value)
                  }
                  placeholder="Tell other students something about yourself..."
                />
              </div>

            </div>

            <div className="profile-actions">

              <button
                type="submit"
                className="save-profile-button"
              >
                Save Profile
              </button>

              <button
                type="button"
                className="cancel-profile-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

            </div>

          </form>
        ) : (
          <div className="profile-information">

            <div className="profile-info-card">
              <span>📧</span>

              <div>
                <small>Email</small>
                <p>{email || 'Not added'}</p>
              </div>
            </div>

            <div className="profile-info-card">
              <span>🎓</span>

              <div>
                <small>Department</small>
                <p>
                  {department || 'Not added'}
                </p>
              </div>
            </div>

            <div className="profile-info-card">
              <span>📚</span>

              <div>
                <small>Year</small>
                <p>{year || 'Not added'}</p>
              </div>
            </div>

            <div className="profile-info-card">
              <span>🏠</span>

              <div>
                <small>Hostel</small>
                <p>
                  {hostel || 'Not added'}
                </p>
              </div>
            </div>

            <div className="profile-bio">

              <h2>About Me</h2>

              <p>
                {bio ||
                  'No bio added yet. Click Edit Profile to add one.'}
              </p>

            </div>

          </div>
        )}

        <Link
          to="/"
          className="back-home-link"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  )
}

export default Profile