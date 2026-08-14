import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getListing } from '../api'
import './ListingDetails.css'

function ListingDetails() {
  const { id } = useParams()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadListing()
  }, [id])

  const loadListing = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getListing(id)

      setItem(data.listing)
    } catch (error) {
      console.error('Failed to load listing:', error)

      setError(
        error.message || 'Failed to load listing'
      )
    } finally {
      setLoading(false)
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

              <Link
                to="/messages"
                className="contact-seller-button"
              >
                Contact Seller
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ListingDetails