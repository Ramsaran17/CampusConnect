import { useEffect, useState } from 'react'
import './LostFound.css'

const sampleItems = [
  {
    id: 'sample-lost-1',
    type: 'Lost',
    title: 'Black Wallet',
    description: 'Black leather wallet with student ID inside.',
    category: 'Personal',
    location: 'Academic Block',
    date: '2026-08-10',
    image: null,
  },
  {
    id: 'sample-found-1',
    type: 'Found',
    title: 'Blue Water Bottle',
    description: 'Blue water bottle found near the library.',
    category: 'Others',
    location: 'Central Library',
    date: '2026-08-11',
    image: null,
  },
  {
    id: 'sample-lost-2',
    type: 'Lost',
    title: 'Scientific Calculator',
    description: 'Casio scientific calculator with name written on it.',
    category: 'Electronics',
    location: 'Lecture Hall',
    date: '2026-08-09',
    image: null,
  },
]

function LostFound() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [type, setType] = useState('Lost')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    const savedItems = JSON.parse(
      localStorage.getItem('lostFoundItems') || '[]'
    )

    setItems([...savedItems, ...sampleItems])
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      alert('Please enter an item title')
      return
    }

    if (!description.trim()) {
      alert('Please enter a description')
      return
    }

    if (!category) {
      alert('Please select a category')
      return
    }

    if (!location.trim()) {
      alert('Please enter the location')
      return
    }

    if (!date) {
      alert('Please select the date')
      return
    }

    const saveItem = (imageData = null) => {
      const newItem = {
        id: Date.now().toString(),
        type,
        title: title.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
        date,
        image: imageData,
      }

      const existingItems = JSON.parse(
        localStorage.getItem('lostFoundItems') || '[]'
      )

      localStorage.setItem(
        'lostFoundItems',
        JSON.stringify([newItem, ...existingItems])
      )

      setItems((currentItems) => [newItem, ...currentItems])

      setTitle('')
      setDescription('')
      setCategory('')
      setLocation('')
      setDate('')
      setImage(null)
      setType('Lost')
      setShowForm(false)

      alert(`${type} item reported successfully!`)
    }

    if (image) {
      const reader = new FileReader()

      reader.onload = () => {
        saveItem(reader.result)
      }

      reader.readAsDataURL(image)
    } else {
      saveItem()
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesFilter =
      filter === 'All' || item.type === filter

    const searchText = search.toLowerCase()

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText)

    return matchesFilter && matchesSearch
  })

  return (
    <div className="lost-found-page">

      <section className="lost-found-header">
        <h1>Lost & Found</h1>

        <p>
          Find lost items or report something you found
          on campus.
        </p>

        <button
          className="report-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Report an Item'}
        </button>
      </section>

      {showForm && (
        <section className="report-section">

          <div className="report-container">

            <h2>Report Lost or Found Item</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Item Status</label>

                <div className="type-buttons">

                  <button
                    type="button"
                    className={
                      type === 'Lost'
                        ? 'type-button active'
                        : 'type-button'
                    }
                    onClick={() => setType('Lost')}
                  >
                    I Lost Something
                  </button>

                  <button
                    type="button"
                    className={
                      type === 'Found'
                        ? 'type-button active'
                        : 'type-button'
                    }
                    onClick={() => setType('Found')}
                  >
                    I Found Something
                  </button>

                </div>
              </div>

              <div className="form-group">
                <label>Item Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Example: Black Wallet"
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe the item..."
                />
              </div>

              <div className="form-group">
                <label>Category</label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                >
                  <option value="">
                    Select a category
                  </option>
                  <option value="Electronics">
                    Electronics
                  </option>
                  <option value="Personal">
                    Personal Items
                  </option>
                  <option value="Books">
                    Books
                  </option>
                  <option value="Clothing">
                    Clothing
                  </option>
                  <option value="Documents">
                    Documents
                  </option>
                  <option value="Others">
                    Others
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="Example: Central Library"
                />
              </div>

              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Item Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setImage(event.target.files[0])
                  }
                />
              </div>

              <button
                className="submit-report-button"
                type="submit"
              >
                Report Item
              </button>

            </form>
          </div>
        </section>
      )}

      <section className="lost-found-content">

        <div className="lost-found-toolbar">

          <input
            type="text"
            placeholder="Search lost or found items..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >
            <option value="All">All Items</option>
            <option value="Lost">Lost Items</option>
            <option value="Found">Found Items</option>
          </select>

        </div>

        <h2>
          {filter === 'All'
            ? 'All Items'
            : `${filter} Items`}
        </h2>

        {filteredItems.length > 0 ? (
          <div className="lost-found-grid">

            {filteredItems.map((item) => (
              <div
                className="lost-found-card"
                key={item.id}
              >

                <div className="lost-found-image">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                  ) : (
                    <span>No image</span>
                  )}

                </div>

                <div className="lost-found-details">

                  <div className="card-title-row">

                    <h3>{item.title}</h3>

                    <span
                      className={
                        item.type === 'Lost'
                          ? 'status lost'
                          : 'status found'
                      }
                    >
                      {item.type}
                    </span>

                  </div>

                  <p>
                    {item.description}
                  </p>

                  <div className="item-info">

                    <span>
                      Category: {item.category}
                    </span>

                    <span>
                      📍 {item.location}
                    </span>

                    <span>
                      📅 {item.date}
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="no-items">
            <h3>No items found</h3>
            <p>
              Try changing your search or filter.
            </p>
          </div>
        )}

      </section>

    </div>
  )
}

export default LostFound