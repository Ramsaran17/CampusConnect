import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getEvents,
  createEvent,
} from '../api'
import './Events.css'

function Events() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [registrationLink, setRegistrationLink] =
    useState('')

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getEvents()

      setEvents(data.events || [])
    } catch (error) {
      console.error(
        'Failed to load events:',
        error
      )

      setError(
        error.message || 'Failed to load events'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title.trim()) {
      alert('Please enter an event title')
      return
    }

    if (!description.trim()) {
      alert('Please enter an event description')
      return
    }

    if (!organizer.trim()) {
      alert('Please enter the organizer name')
      return
    }

    if (!date) {
      alert('Please select an event date')
      return
    }

    if (!startTime) {
      alert('Please select the start time')
      return
    }

    if (!location.trim()) {
      alert('Please enter the event location')
      return
    }

    if (!category.trim()) {
      alert('Please enter the event category')
      return
    }

    try {
      setSubmitting(true)

      await createEvent({
        title: title.trim(),
        description: description.trim(),
        organizer: organizer.trim(),
        date,
        startTime,
        endTime,
        location: location.trim(),
        category: category.trim(),
        image: image.trim(),
        registrationLink:
          registrationLink.trim(),
      })

      alert('Event added successfully!')

      setTitle('')
      setDescription('')
      setOrganizer('')
      setDate('')
      setStartTime('')
      setEndTime('')
      setLocation('')
      setCategory('')
      setImage('')
      setRegistrationLink('')
      setShowForm(false)

      await loadEvents()
    } catch (error) {
      console.error(
        'Create event error:',
        error
      )

      alert(
        error.message || 'Failed to create event'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const filteredEvents = events.filter(
    (event) => {
      const searchText =
        search.toLowerCase()

      const matchesSearch =
        (event.title || '')
          .toLowerCase()
          .includes(searchText) ||
        (event.description || '')
          .toLowerCase()
          .includes(searchText) ||
        (event.location || '')
          .toLowerCase()
          .includes(searchText) ||
        (event.organizer || '')
          .toLowerCase()
          .includes(searchText)

      const matchesCategory =
        categoryFilter === 'All' ||
        event.category === categoryFilter

      return (
        matchesSearch &&
        matchesCategory
      )
    }
  )

  return (
    <div className="events-page">

      <section className="events-header">

        <h1>Campus Events</h1>

        <p>
          Discover and share events happening around
          campus.
        </p>

        <button
          type="button"
          className="add-event-button"
          onClick={() =>
            setShowForm((current) => !current)
          }
        >
          {showForm
            ? 'Close Form'
            : 'Add Event'}
        </button>

      </section>

      {showForm && (
        <section className="event-form-section">

          <div className="event-form-container">

            <h2>Add Campus Event</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>Event Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Example: Coding Contest"
                />

              </div>

              <div className="form-group">

                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe the event..."
                />

              </div>

              <div className="form-group">

                <label>Organizer</label>

                <input
                  type="text"
                  value={organizer}
                  onChange={(event) =>
                    setOrganizer(
                      event.target.value
                    )
                  }
                  placeholder="Example: Coding Club"
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
                    Select category
                  </option>

                  <option value="Technical">
                    Technical
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Workshop">
                    Workshop
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div className="event-date-time">

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

                  <label>Start Time</label>

                  <input
                    type="time"
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>End Time</label>

                <input
                  type="time"
                  value={endTime}
                  onChange={(event) =>
                    setEndTime(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>Location</label>

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(
                      event.target.value
                    )
                  }
                  placeholder="Example: Main Auditorium"
                />

              </div>

              <div className="form-group">

                <label>Event Image URL</label>

                <input
                  type="url"
                  value={image}
                  onChange={(event) =>
                    setImage(event.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                />

              </div>

              <div className="form-group">

                <label>
                  Registration Link
                </label>

                <input
                  type="url"
                  value={registrationLink}
                  onChange={(event) =>
                    setRegistrationLink(
                      event.target.value
                    )
                  }
                  placeholder="https://example.com/register"
                />

              </div>

              <button
                className="submit-event-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? 'Adding...'
                  : 'Add Event'}
              </button>

            </form>

          </div>

        </section>
      )}

      <section className="events-content">

        <div className="events-toolbar">

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Technical">
              Technical
            </option>

            <option value="Cultural">
              Cultural
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Academic">
              Academic
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        <h2>Upcoming Events</h2>

        {loading ? (
          <div className="no-events">

            <h3>Loading events...</h3>

          </div>
        ) : error ? (
          <div className="no-events">

            <h3>Unable to load events</h3>

            <p>{error}</p>

          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="events-grid">

            {filteredEvents.map((event) => (

              <div
                className="event-card"
                key={event._id}
              >

                <div className="event-image">

                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                    />
                  ) : (
                    <span>📅</span>
                  )}

                </div>

                <div className="event-details">

                  <div className="event-title-row">

                    <h3>
                      {event.title}
                    </h3>

                    <span className="event-category">
                      {event.category}
                    </span>

                  </div>

                  <p className="event-description">
                    {event.description}
                  </p>

                  <div className="event-info">

                    <span>
                      📅 {event.date}
                    </span>

                    <span>
                      🕐 {event.startTime}
                      {event.endTime
                        ? ` - ${event.endTime}`
                        : ''}
                    </span>

                    <span>
                      📍 {event.location}
                    </span>

                    <span>
                      👤 {event.organizer}
                    </span>

                  </div>

                  <div className="event-card-actions">

                    <Link
                      to={`/events/${event._id}`}
                      className="event-view-details-button"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>
        ) : (
          <div className="no-events">

            <h3>No events found</h3>

            <p>
              Try changing your search or category.
            </p>

          </div>
        )}

      </section>

    </div>
  )
}

export default Events