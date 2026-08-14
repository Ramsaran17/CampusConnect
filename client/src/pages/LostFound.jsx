import { useEffect, useState } from 'react'
import {
  getLostFoundPosts,
  createLostFoundPost,
} from '../api'
import './LostFound.css'

function LostFound() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [type, setType] = useState('lost')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState(null)
  const [contactInfo, setContactInfo] = useState('')

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)

      const data = await getLostFoundPosts()

      const formattedPosts = (data.posts || []).map(
        (post) => ({
          ...post,
          id: post._id,
          type: post.type,
        })
      )

      setItems(formattedPosts)
    } catch (error) {
      console.error(
        'Failed to load Lost & Found posts:',
        error
      )

      alert(
        error.message ||
          'Failed to load Lost & Found posts'
      )
    } finally {
      setLoading(false)
    }
  }

  const readImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.onerror = () => {
        reject(
          new Error('Failed to read image')
        )
      }

      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (event) => {
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

    if (!contactInfo.trim()) {
      alert('Please enter contact information')
      return
    }

    try {
      setSubmitting(true)

      let imageData = ''

      if (image) {
        imageData = await readImageFile(image)
      }

      await createLostFoundPost({
        type,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        location: location.trim(),
        date,
        image: imageData,
        contactInfo: contactInfo.trim(),
      })

      alert(
        `${type === 'lost' ? 'Lost' : 'Found'} item reported successfully!`
      )

      setTitle('')
      setDescription('')
      setCategory('')
      setLocation('')
      setDate('')
      setImage(null)
      setContactInfo('')
      setType('lost')
      setShowForm(false)

      await loadPosts()
    } catch (error) {
      console.error(
        'Create Lost & Found post error:',
        error
      )

      alert(
        error.message ||
          'Failed to create Lost & Found post'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const filteredItems = items.filter((item) => {
    const currentType =
      item.type === 'lost' ? 'Lost' : 'Found'

    const matchesFilter =
      filter === 'All' ||
      currentType === filter

    const searchText = search.toLowerCase()

    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(searchText) ||
      item.description
        .toLowerCase()
        .includes(searchText) ||
      item.location
        .toLowerCase()
        .includes(searchText)

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
          {showForm
            ? 'Close Form'
            : 'Report an Item'}
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
                      type === 'lost'
                        ? 'type-button active'
                        : 'type-button'
                    }
                    onClick={() => setType('lost')}
                  >
                    I Lost Something
                  </button>

                  <button
                    type="button"
                    className={
                      type === 'found'
                        ? 'type-button active'
                        : 'type-button'
                    }
                    onClick={() => setType('found')}
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

                <label>Contact Information</label>

                <input
                  type="text"
                  value={contactInfo}
                  onChange={(event) =>
                    setContactInfo(event.target.value)
                  }
                  placeholder="Phone number or email"
                />

              </div>

              <div className="form-group">

                <label>Item Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setImage(
                      event.target.files[0] || null
                    )
                  }
                />

              </div>

              <button
                className="submit-report-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? 'Reporting...'
                  : 'Report Item'}
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
            <option value="All">
              All Items
            </option>

            <option value="Lost">
              Lost Items
            </option>

            <option value="Found">
              Found Items
            </option>
          </select>

        </div>

        <h2>
          {filter === 'All'
            ? 'All Items'
            : `${filter} Items`}
        </h2>

        {loading ? (
          <div className="no-items">
            <h3>Loading items...</h3>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="lost-found-grid">

            {filteredItems.map((item) => (

              <div
                className="lost-found-card"
                key={item._id}
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
                        item.type === 'lost'
                          ? 'status lost'
                          : 'status found'
                      }
                    >
                      {item.type === 'lost'
                        ? 'Lost'
                        : 'Found'}
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