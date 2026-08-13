import { Link, useParams } from 'react-router-dom'
import './ListingDetails.css'

const sampleListings = [
  {
    id: 'sample-1',
    title: 'Study Table',
    description: 'Wooden study table in good condition.',
    category: 'Furniture',
    condition: 'Good',
    location: 'Hostel 3',
    price: 1200,
    isFree: false,
    image: null,
  },
  {
    id: 'sample-2',
    title: 'Scientific Calculator',
    description:
      'Calculator suitable for engineering students.',
    category: 'Electronics',
    condition: 'Used',
    location: 'Hostel 1',
    price: 500,
    isFree: false,
    image: null,
  },
  {
    id: 'sample-3',
    title: 'Engineering Books',
    description:
      'Previous semester engineering textbooks.',
    category: 'Books',
    condition: 'Good',
    location: 'Library',
    price: 0,
    isFree: true,
    image: null,
  },
]

function ListingDetails() {
  const { id } = useParams()

  const savedListings = JSON.parse(
    localStorage.getItem('marketplaceListings') || '[]'
  )

  const allListings = [
    ...savedListings,
    ...sampleListings,
  ]

  const item = allListings.find(
    (listing) => String(listing.id) === String(id)
  )

  if (!item) {
    return (
      <div className="listing-not-found">

        <h1>Item Not Found</h1>

        <p>
          Sorry, this listing is no longer available.
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

              <span>{item.category}</span>

              <span>{item.condition}</span>

            </div>

            <div className="listing-information">

              <div className="information-item">

                <span>📍</span>

                <div>
                  <small>Pickup Location</small>
                  <p>{item.location}</p>
                </div>

              </div>

              <div className="information-item">

                <span>🏷️</span>

                <div>
                  <small>Category</small>
                  <p>{item.category}</p>
                </div>

              </div>

              <div className="information-item">

                <span>✨</span>

                <div>
                  <small>Condition</small>
                  <p>{item.condition}</p>
                </div>

              </div>

              <div className="information-item">

                <span>💰</span>

                <div>
                  <small>Price</small>

                  <p>
                    {item.isFree
                      ? 'Free'
                      : `₹${item.price}`}
                  </p>

                </div>

              </div>

            </div>

            <div className="seller-section">

              <h2>Interested in this item?</h2>

              <p>
                Contact the seller through CampusConnect
                to discuss the item and arrange a meeting.
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