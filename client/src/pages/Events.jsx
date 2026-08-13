import { useEffect, useState } from 'react'
import './Events.css'

const sampleEvents = [
  {
    id: 'sample-event-1',
    title: 'Campus Coding Contest',
    description:
      'A coding competition for students to test their problem-solving skills.',
    category: 'Technical',
    date: '2026-08-20',
    time: '10:00 AM',
    venue: 'Computer Centre',
    organizer: 'Coding Club',
    image: null,
  },
  {
    id: 'sample-event-2',
    title: 'Cultural Night',
    description:
      'An evening filled with music, dance and cultural performances.',
    category: 'Cultural',
    date: '2026-08-25',
    time: '6:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Cultural Committee',
    image: null,
  },
  {
    id: 'sample-event-3',
    title: 'Badminton Tournament',
    description:
      'Inter-hostel badminton tournament for students.',
    category: 'Sports',
    date: '2026-08-28',
    time: '4:00 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Committee',
    image: null,
  },
]

function Events() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    const savedEvents = JSON.parse(
      localStorage.getItem('campusEvents') || '[]'
    )

    setEvents([...savedEvents, ...sampleEvents])
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      alert('Please enter an event title')
      return
    }

    if (!description.trim()) {
      alert('Please enter an event description')
      return
    }

    if (!category) {
      alert('Please select an event category')
      return
    }

    if (!date) {
      alert('Please select an event date')
      return
    }

    if (!time) {
      alert('Please select an event time')
      return
    }

    if (!venue.trim()) {
      alert('Please enter the event venue')
      return
    }

    if (!organizer.trim()) {
      alert('Please enter the organizer name')
      return
    }

    const saveEvent = (imageData = null) => {
      const newEvent = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category,
        date,
        time,
        venue: venue.trim(),
        organizer: organizer.trim(),
        image: imageData,
      }

      const existingEvents = JSON.parse(
        localStorage.getItem('campusEvents') || '[]'
      )

      localStorage.setItem(
        'campusEvents',
        JSON.stringify([
          newEvent,
          ...existingEvents,
        ])
      )

      setEvents((currentEvents) => [
        newEvent,
        ...currentEvents,
      ])

      setTitle('')
      setDescription('')
      setCategory('')
      setDate('')
      setTime('')
      setVenue('')
      setOrganizer('')
      setImage(null)
      setShowForm(false)

      alert('Event added successfully!')
    }

    if (image) {
      const reader = new FileReader()

      reader.onload = () => {
        saveEvent(reader.result)
      }

      reader.readAsDataURL(image)
    } else {
      saveEvent()
    }
  }

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.description.toLowerCase().includes(searchText) ||
      event.venue.toLowerCase().includes(searchText) ||
      event.organizer.toLowerCase().includes(searchText)

    const matchesCategory =
      categoryFilter === 'All' ||
      event.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="events-page">

      <section className="events-header">
        <h1>Campus Events</h1>

        <p>
          Discover and share events happening around campus.
        </p>

        <button
          className="add-event-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Add Event'}
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
                    setDescription(event.target.value)
                  }
                  placeholder="Describe the event..."
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
                  <label>Time</label>

                  <input
                    type="time"
                    value={time}
                    onChange={(event) =>
                      setTime(event.target.value)
                    }
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Venue</label>

                <input
                  type="text"
                  value={venue}
                  onChange={(event) =>
                    setVenue(event.target.value)
                  }
                  placeholder="Example: Main Auditorium"
                />
              </div>

              <div className="form-group">
                <label>Organizer</label>

                <input
                  type="text"
                  value={organizer}
                  onChange={(event) =>
                    setOrganizer(event.target.value)
                  }
                  placeholder="Example: Coding Club"
                />
              </div>

              <div className="form-group">
                <label>Event Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setImage(event.target.files[0])
                  }
                />
              </div>

              <button
                className="submit-event-button"
                type="submit"
              >
                Add Event
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
              setCategoryFilter(event.target.value)
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

        {filteredEvents.length > 0 ? (
          <div className="events-grid">

            {filteredEvents.map((event) => (
              <div
                className="event-card"
                key={event.id}
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

                    <h3>{event.title}</h3>

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
                      🕐 {event.time}
                    </span>

                    <span>
                      📍 {event.venue}
                    </span>

                    <span>
                      👤 {event.organizer}
                    </span>

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