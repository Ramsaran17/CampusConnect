import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getListing, updateListing } from '../api'
import './CreateListing.css'

function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isFree, setIsFree] = useState(false)
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadListing()
  }, [id])

  const loadListing = async () => {
    try {
      const data = await getListing(id)
      const listing = data.listing

      setTitle(listing.title || '')
      setDescription(listing.description || '')
      setPrice(listing.price ?? '')
      setIsFree(listing.isFree || false)
      setCategory(listing.category || '')
      setCondition(listing.condition || '')
      setImage(listing.image || '')
      setLocation(listing.location || '')
    } catch (error) {
      alert(error.message || 'Failed to load listing')
      navigate('/marketplace')
    } finally {
      setLoading(false)
    }
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

    if (!condition) {
      alert('Please select the item condition')
      return
    }

    if (!location.trim()) {
      alert('Please enter a pickup location')
      return
    }

    if (!isFree && price === '') {
      alert('Please enter a price or select free')
      return
    }

    try {
      setSaving(true)

      await updateListing(id, {
        title: title.trim(),
        description: description.trim(),
        price: isFree ? 0 : Number(price),
        isFree,
        category,
        condition,
        image,
        location: location.trim(),
      })

      alert('Listing updated successfully')

      navigate(`/marketplace/${id}`)
    } catch (error) {
      alert(error.message || 'Failed to update listing')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="listing-not-found">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="create-listing-page">

      <div className="create-listing-container">

        <h1>Edit Listing</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Item Title</label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
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
              type="text"
              value={image}
              onChange={(event) =>
                setImage(event.target.value)
              }
              placeholder="Image URL or existing image data"
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
              />

            </div>
          )}

          <button
            className="submit-button"
            type="submit"
            disabled={saving}
          >
            {saving
              ? 'Saving...'
              : 'Save Changes'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default EditListing