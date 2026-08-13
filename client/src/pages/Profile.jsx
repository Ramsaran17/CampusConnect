import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMe, updateProfile } from '../api'
import './Profile.css'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  // Saved profile data
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [hostel, setHostel] = useState('')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState(null)

  // Temporary editing data
  const [editName, setEditName] = useState('')
  const [editDepartment, setEditDepartment] = useState('')
  const [editYear, setEditYear] = useState('')
  const [editHostel, setEditHostel] = useState('')
  const [editBio, setEditBio] = useState('')
  const [editProfileImage, setEditProfileImage] = useState(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await getMe()
      const user = data.user

      const yearLabels = {
        1: '1st Year',
        2: '2nd Year',
        3: '3rd Year',
        4: '4th Year',
      }

      setName(user.name || '')
      setEmail(user.email || '')
      setDepartment(user.department || '')
      setYear(yearLabels[user.year] || '')
      setProfileImage(user.profileImage || null)

      const extraProfile = JSON.parse(
        localStorage.getItem('studentExtraProfile') || 'null'
      )

      if (extraProfile) {
        setHostel(extraProfile.hostel || '')
        setBio(extraProfile.bio || '')
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }

  const startEditing = () => {
    setEditName(name)
    setEditDepartment(department)
    setEditYear(year)
    setEditHostel(hostel)
    setEditBio(bio)
    setEditProfileImage(profileImage)

    setIsEditing(true)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setEditProfileImage(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSave = async (event) => {
    event.preventDefault()

    if (!editName.trim()) {
      alert('Please enter your name')
      return
    }

    if (!editDepartment.trim()) {
      alert('Please enter your department')
      return
    }

    if (!editYear) {
      alert('Please select your year')
      return
    }

    try {
      const numericYear = Number(
        editYear.replace(/\D/g, '')
      )

      const data = await updateProfile({
        name: editName.trim(),
        department: editDepartment.trim(),
        year: numericYear,
        profileImage: editProfileImage || '',
      })

      const updatedUser = data.user

      const yearLabels = {
        1: '1st Year',
        2: '2nd Year',
        3: '3rd Year',
        4: '4th Year',
      }

      setName(updatedUser.name || '')
      setEmail(updatedUser.email || '')
      setDepartment(updatedUser.department || '')
      setYear(yearLabels[updatedUser.year] || '')
      setProfileImage(updatedUser.profileImage || null)

      setHostel(editHostel.trim())
      setBio(editBio.trim())

      localStorage.setItem(
        'studentExtraProfile',
        JSON.stringify({
          hostel: editHostel.trim(),
          bio: editBio.trim(),
        })
      )

      localStorage.setItem(
        'currentUser',
        JSON.stringify(updatedUser)
      )

      setIsEditing(false)

      alert('Profile updated successfully!')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* ================= HEADER ================= */}

        <div className="profile-header">

          <div className="profile-photo-section">

            <div className="profile-photo">

              {isEditing ? (
                editProfileImage ? (
                  <img
                    src={editProfileImage}
                    alt="Profile"
                  />
                ) : (
                  <span>
                    {name
                      ? name.charAt(0).toUpperCase()
                      : 'U'}
                  </span>
                )
              ) : profileImage ? (
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

            <h1>
              {name || 'Student Profile'}
            </h1>

            <p>
              {department || 'Department not added'}
            </p>

          </div>

          {!isEditing && (
            <button
              className="edit-profile-button"
              onClick={startEditing}
            >
              Edit Profile
            </button>
          )}

        </div>

        {/* ================= EDIT FORM ================= */}

        {isEditing ? (

          <form
            className="profile-form"
            onSubmit={handleSave}
          >

            <div className="profile-form-grid">

              {/* NAME */}

              <div className="form-group">

                <label>Name</label>

                <input
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(event.target.value)
                  }
                  placeholder="Enter your name"
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  value={email}
                  disabled
                />

              </div>

              {/* DEPARTMENT */}

              <div className="form-group">

                <label>Department</label>

                <input
                  type="text"
                  value={editDepartment}
                  onChange={(event) =>
                    setEditDepartment(
                      event.target.value
                    )
                  }
                  placeholder="Example: ECE"
                />

              </div>

              {/* YEAR */}

              <div className="form-group">

                <label>Year</label>

                <select
                  className="year-select"
                  value={editYear}
                  onChange={(event) =>
                    setEditYear(event.target.value)
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

                </select>

              </div>

              {/* HOSTEL */}

              <div className="form-group">

                <label>Hostel</label>

                <input
                  type="text"
                  value={editHostel}
                  onChange={(event) =>
                    setEditHostel(
                      event.target.value
                    )
                  }
                  placeholder="Example: Hostel 5"
                />

              </div>

              {/* BIO */}

              <div className="form-group full-width">

                <label>Bio</label>

                <textarea
                  value={editBio}
                  onChange={(event) =>
                    setEditBio(event.target.value)
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
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>

          </form>

        ) : (

          /* ================= PROFILE INFORMATION ================= */

          <div className="profile-information">

            <div className="profile-info-card">

              <span>📧</span>

              <div>
                <small>Email</small>

                <p>
                  {email || 'Not added'}
                </p>
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

                <p>
                  {year || 'Not added'}
                </p>
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