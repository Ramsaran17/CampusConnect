import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getLostFoundPost,
  getMe,
  deleteLostFoundPost,
} from '../api'
import BackButton from '../components/BackButton'
import './LostFoundDetails.css'

function LostFoundDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError('')

      const [postData, userData] = await Promise.all([
        getLostFoundPost(id),
        getMe(),
      ])

      setItem(postData.post)
      setCurrentUser(userData.user)
    } catch (error) {
      console.error(
        'Failed to load Lost & Found post:',
        error
      )

      setError(
        error.message ||
          'Failed to load Lost & Found post'
      )
    } finally {
      setLoading(false)
    }
  }

  const isOwner =
    item &&
    currentUser &&
    String(item.user?._id) ===
      String(currentUser._id)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this Lost & Found post?'
    )

    if (!confirmed) {
      return
    }

    try {
      setDeleting(true)

      await deleteLostFoundPost(id)

      alert(
        'Lost & Found post deleted successfully'
      )

      navigate('/lost-found')
    } catch (error) {
      console.error(
        'Failed to delete Lost & Found post:',
        error
      )

      alert(
        error.message ||
          'Failed to delete Lost & Found post'
      )
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="lost-found-details-page">
        <div className="lost-found-details-not-found">
          <h1>Loading...</h1>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="lost-found-details-page">
        <div className="lost-found-details-not-found">

          <h1>Item Not Found</h1>

          <p>
            {error ||
              'This Lost & Found post is no longer available.'}
          </p>

          <Link to="/lost-found">
            ← Back to Lost & Found
          </Link>

        </div>
      </div>
    )
  }

  return (
    <div className="lost-found-details-page">

      <div className="lost-found-details-container">

        <BackButton label="Back to Lost & Found" fallback="/lost-found" />

        <div className="lost-found-details-card">

          <div className="lost-found-details-image">

            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
              />
            ) : (
              <span>No image available</span>
            )}

          </div>

          <div className="lost-found-details-content">

            <div className="lost-found-title-row">

              <h1>{item.title}</h1>

              <span
                className={
                  item.type === 'lost'
                    ? 'details-status lost'
                    : 'details-status found'
                }
              >
                {item.type === 'lost'
                  ? 'Lost'
                  : 'Found'}
              </span>

            </div>

            <p className="lost-found-details-description">
              {item.description}
            </p>

            <div className="lost-found-information">

              <div className="lost-found-information-item">
                <span>🏷️</span>

                <div>
                  <small>Category</small>
                  <p>{item.category}</p>
                </div>
              </div>

              <div className="lost-found-information-item">
                <span>📍</span>

                <div>
                  <small>Location</small>
                  <p>{item.location}</p>
                </div>
              </div>

              <div className="lost-found-information-item">
                <span>📅</span>

                <div>
                  <small>Date</small>
                  <p>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="lost-found-information-item">
                <span>📞</span>

                <div>
                  <small>Contact Information</small>
                  <p>{item.contactInfo}</p>
                </div>
              </div>

            </div>

            <div className="lost-found-reported-by">

              <h2>Reported By</h2>

              <p>
                {item.user?.name || 'Unknown user'}
              </p>

              {item.user?.email && (
                <p>{item.user.email}</p>
              )}

            </div>

            {isOwner && (
  <div className="lost-found-owner-actions">

    <Link
      to={`/lost-found/${id}/edit`}
      className="lost-found-edit-button"
    >
      Edit Post
    </Link>

    <button
      type="button"
      className="lost-found-delete-button"
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting
        ? 'Deleting...'
        : 'Delete Post'}
    </button>

  </div>
)}

          </div>

        </div>

      </div>

    </div>
  )
}

export default LostFoundDetails