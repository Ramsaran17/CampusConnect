import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ListingCard from '../components/ListingCard'
import './Marketplace.css'

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

function Marketplace() {
  const [listings, setListings] = useState(sampleListings)

  useEffect(() => {
    const savedListings = JSON.parse(
      localStorage.getItem('marketplaceListings') || '[]'
    )

    setListings([
      ...savedListings,
      ...sampleListings,
    ])
  }, [])

  return (
    <div className="marketplace-page">

      <section className="marketplace-header">

        <h1>Campus Marketplace</h1>

        <p>
          Buy and sell useful items within your campus
          community.
        </p>

        <Link to="/marketplace/create">
          <button>Post an Item</button>
        </Link>

      </section>

      <section className="marketplace-content">

        <h2>Available Items</h2>

        <div className="listings-grid">

          {listings.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </section>

    </div>
  )
}

export default Marketplace