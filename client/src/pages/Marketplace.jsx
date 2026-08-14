import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getListings } from '../api'
import ListingCard from '../components/ListingCard'
import './Marketplace.css'

function Marketplace() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings()

        const formattedListings = data.listings.map(
          (listing) => ({
            ...listing,
            id: listing._id,
          })
        )

        setListings(formattedListings)
      } catch (error) {
        console.error('Failed to fetch listings:', error)
        alert(error.message || 'Failed to fetch listings')
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="marketplace-page">

      <section className="marketplace-header">

        <h1>Campus Marketplace</h1>

        <p>
          Buy and sell useful items within your campus
          community.
        </p>

        <Link
          to="/marketplace/create"
          className="post-item-button"
        >
          Post an Item
        </Link>

      </section>

      <section className="marketplace-content">

        <h2>Available Items</h2>

        {loading ? (
          <p className="no-listings">
            Loading items...
          </p>
        ) : listings.length === 0 ? (
          <p className="no-listings">
            No items have been posted yet.
          </p>
        ) : (
          <div className="listings-grid">

            {listings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
              />
            ))}

          </div>
        )}

      </section>

    </div>
  )
}

export default Marketplace