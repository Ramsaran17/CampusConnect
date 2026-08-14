import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createListing } from '../api'
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
  const [loading, setLoading] = useState(false)

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

    try {
      setLoading(true)

      let imageData = ''

      if (image) {
        imageData = await readImageFile(image)
      }

      await createListing({
        title: title.trim(),
        description: description.trim(),
        price: isFree ? 0 : Number(price),
        isFree,
        category,
        condition,
        image: imageData,
        location: location.trim(),
      })

      alert('Item posted successfully!')

      navigate('/marketplace')
    } catch (error) {
      alert(error.message)
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
              onChange={(event) =>
                setTitle(event.target.value)
              }
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

              <option value="">
                Select a category
              </option>

              <option value="furniture">
                Furniture
              </option>

              <option value="electronics">
                Electronics
              </option>

              <option value="books">
                Books
              </option>

              <option value="cycles">
                Cycles
              </option>

              <option value="other">
                Other
              </option>

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

              <option value="">
                Select condition
              </option>

              <option value="new">
                New
              </option>

              <option value="good">
                Good
              </option>

              <option value="used">
                Used
              </option>

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

            <label>
              Give away for free
            </label>

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
            disabled={loading}
          >
            {loading
              ? 'Posting...'
              : 'Post Item'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default CreateListing