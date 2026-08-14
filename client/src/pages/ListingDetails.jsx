import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getListing, getMe, deleteListing } from '../api'
import './ListingDetails.css'

function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadListing()
  }, [id])

  const loadListing = async () => {
    try {
      setLoading(true)
      setError('')

      const [listingData, userData] = await Promise.all([
        getListing(id),
        getMe(),
      ])

      setItem(listingData.listing)
      setCurrentUser(userData.user)
    } catch (error) {
      console.error('Failed to load listing:', error)

      setError(
        error.message || 'Failed to load listing'
      )
    } finally {
      setLoading(false)
    }
  }

  const isOwner =
    item &&
    currentUser &&
    String(item.seller?._id) === String(currentUser._id)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this listing?'
    )

    if (!confirmed) {
      return
    }

    try {
      setDeleting(true)

      await deleteListing(id)

      alert('Listing deleted successfully')

      navigate('/marketplace')
    } catch (error) {
      console.error('Failed to delete listing:', error)

      alert(
        error.message || 'Failed to delete listing'
      )
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="listing-not-found">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="listing-not-found">

        <h1>Item Not Found</h1>

        <p>
          {error ||
            'Sorry, this listing is no longer available.'}
        </p>

        <Link to="/marketplace">
          ← Back to Marketplace
        </Link>

      </div>
    )
  }

  return (
    <div className="listing-details-page">

      <div className="listing-details-container">

        <Link
          to="/marketplace"
          className="back-marketplace"
        >
          ← Back to Marketplace
        </Link>

        <div className="listing-details-card">

          <div className="listing-details-image">

            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
              />
            ) : (
              <span>No image available</span>
            )}

          </div>

          <div className="listing-details-content">

            <div className="listing-details-title-row">

              <h1>{item.title}</h1>

              <strong className="listing-price">
                {item.isFree
                  ? 'Free'
                  : `₹${item.price}`}
              </strong>

            </div>

            <p className="listing-description">
              {item.description}
            </p>

            <div className="listing-tags">

              <span>
                {item.category}
              </span>

              <span>
                {item.condition}
              </span>

            </div>

            <div className="listing-information">

              <div className="information-item">

                <span>📍</span>

                <div>
                  <small>
                    Pickup Location
                  </small>

                  <p>
                    {item.location}
                  </p>
                </div>

              </div>

              <div className="information-item">

                <span>🏷️</span>

                <div>
                  <small>
                    Category
                  </small>

                  <p>
                    {item.category}
                  </p>
                </div>

              </div>

              <div className="information-item">

                <span>✨</span>

                <div>
                  <small>
                    Condition
                  </small>

                  <p>
                    {item.condition}
                  </p>
                </div>

              </div>

              <div className="information-item">

                <span>💰</span>

                <div>
                  <small>
                    Price
                  </small>

                  <p>
                    {item.isFree
                      ? 'Free'
                      : `₹${item.price}`}
                  </p>

                </div>

              </div>

            </div>

            <div className="seller-section">

              <h2>
                Interested in this item?
              </h2>

              <p>
                Contact the seller through
                CampusConnect to discuss the item
                and arrange a meeting.
              </p>

              <div className="listing-action-buttons">

                <Link
                  to="/messages"
                  className="contact-seller-button"
                >
                  Contact Seller
                </Link>

                {isOwner && (
                  <>
                    <Link
                      to={`/marketplace/${id}/edit`}
                      className="edit-listing-button"
                    >
                      Edit Listing
                    </Link>

                    <button
                      type="button"
                      className="delete-listing-button"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting
                        ? 'Deleting...'
                        : 'Delete Listing'}
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ListingDetails