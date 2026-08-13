import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateListing.css'

function CreateListing() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isFree, setIsFree] = useState(false)
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [image, setImage] = useState(null)
  const [location, setLocation] = useState('')

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

    if (!condition) {
      alert('Please select the item condition')
      return
    }

    if (!location.trim()) {
      alert('Please enter a pickup location')
      return
    }

    if (!isFree && !price) {
      alert('Please enter a price or select free')
      return
    }

    const saveListing = (imageData = null) => {
      const newListing = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        price: isFree ? 0 : Number(price),
        isFree,
        category,
        condition,
        image: imageData,
        location: location.trim(),
      }

      const existingListings = JSON.parse(
        localStorage.getItem('marketplaceListings') || '[]'
      )

      localStorage.setItem(
        'marketplaceListings',
        JSON.stringify([
          newListing,
          ...existingListings,
        ])
      )

      alert('Item posted successfully!')

      navigate('/marketplace')
    }

    if (image) {
      const reader = new FileReader()

      reader.onload = () => {
        saveListing(reader.result)
      }

      reader.readAsDataURL(image)
    } else {
      saveListing()
    }
  }

  return (
    <div className="create-listing-page">
      <div className="create-listing-container">

        <h1>Post an Item</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Item Title</label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Study Table"
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
              <option value="">Select a category</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Cycles">Cycles</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Condition</label>

            <select
              value={condition}
              onChange={(event) =>
                setCondition(event.target.value)
              }
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Used">Used</option>
            </select>
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

          <div className="form-group">
            <label>Pickup Location</label>

            <input
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              placeholder="Example: Hostel 3, Main Gate"
            />
          </div>

          <div className="free-option">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(event) =>
                setIsFree(event.target.checked)
              }
            />

            <label>Give away for free</label>
          </div>

          {!isFree && (
            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                min="0"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                placeholder="Enter price"
              />
            </div>
          )}

          <button
            className="submit-button"
            type="submit"
          >
            Post Item
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateListing