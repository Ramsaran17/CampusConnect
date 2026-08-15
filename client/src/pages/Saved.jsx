import { useEffect, useState } from 'react'
import {
  getSavedItems,
  removeSavedItem,
} from '../api'
import './Saved.css'

function Saved() {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSavedItems()
  }, [])

  const loadSavedItems = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getSavedItems()

      setSavedItems(data.saves || [])
    } catch (error) {
      console.error(
        'Failed to load saved items:',
        error
      )

      setError(
        error.message ||
          'Failed to load saved items'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (
    itemType,
    itemId
  ) => {
    try {
      await removeSavedItem(
        itemType,
        itemId
      )

      setSavedItems((current) =>
        current.filter(
          (item) =>
            !(
              item.itemType === itemType &&
              item.itemId === itemId
            )
        )
      )
    } catch (error) {
      console.error(
        'Failed to remove saved item:',
        error
      )

      setError(
        error.message ||
          'Failed to remove saved item'
      )
    }
  }

  const getItemTypeLabel = (
    itemType
  ) => {
    switch (itemType) {
      case 'marketplace':
        return 'Marketplace'

      case 'academic':
        return 'Academic Resource'

      case 'event':
        return 'Event'

      case 'lost-found':
        return 'Lost & Found'

      default:
        return itemType
    }
  }

  return (
    <div className="saved-page">

      <section className="saved-header">

        <h1>Saved Items</h1>

        <p>
          Keep your important Marketplace,
          Academic, Event, and Lost & Found
          items in one place.
        </p>

      </section>

      <section className="saved-container">

        {loading ? (
          <div className="saved-empty">

            <h2>
              Loading saved items...
            </h2>

          </div>
        ) : error ? (
          <div className="saved-error">
            {error}
          </div>
        ) : savedItems.length === 0 ? (
          <div className="saved-empty">

            <div className="saved-empty-icon">
              🔖
            </div>

            <h2>
              No saved items yet
            </h2>

            <p>
              Items you save from Marketplace,
              Academic Resources, Events, or
              Lost & Found will appear here.
            </p>

          </div>
        ) : (
          <div className="saved-grid">

            {savedItems.map((item) => (
              <article
                className="saved-card"
                key={item._id}
              >

                <div className="saved-card-top">

                  <span className="saved-type">
                    {getItemTypeLabel(
                      item.itemType
                    )}
                  </span>

                  <button
                    type="button"
                    className="saved-remove-button"
                    onClick={() =>
                      handleRemove(
                        item.itemType,
                        item.itemId
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

                <div className="saved-card-content">

                  <h3>
                    Saved Item
                  </h3>

                  <p>
                    Item ID: {item.itemId}
                  </p>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  )
}

export default Saved