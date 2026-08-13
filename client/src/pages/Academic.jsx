import { useEffect, useState } from 'react'
import './Academic.css'

const sampleResources = [
  {
    id: 'sample-academic-1',
    title: 'Digital Communication Previous Year Paper',
    subject: 'Digital Communication',
    type: 'Previous Year Paper',
    description:
      'Previous year question paper for Digital Communication.',
    link: '',
    file: null,
  },
  {
    id: 'sample-academic-2',
    title: 'Data Structures Notes',
    subject: 'Data Structures',
    type: 'Notes',
    description:
      'Complete notes covering important Data Structures topics.',
    link: '',
    file: null,
  },
  {
    id: 'sample-academic-3',
    title: 'DBMS Study Material',
    subject: 'DBMS',
    type: 'Study Material',
    description:
      'Study material covering SQL, normalization and database concepts.',
    link: '',
    file: null,
  },
]

function Academic() {
  const [resources, setResources] = useState([])
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    const savedResources = JSON.parse(
      localStorage.getItem('academicResources') || '[]'
    )

    setResources([...savedResources, ...sampleResources])
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      alert('Please enter a resource title')
      return
    }

    if (!subject.trim()) {
      alert('Please enter a subject')
      return
    }

    if (!type) {
      alert('Please select a resource type')
      return
    }

    if (!description.trim()) {
      alert('Please enter a description')
      return
    }

    if (!link.trim() && !file) {
      alert('Please provide a resource link or upload a file')
      return
    }

    const saveResource = (fileData = null) => {
      const newResource = {
        id: Date.now().toString(),
        title: title.trim(),
        subject: subject.trim(),
        type,
        description: description.trim(),
        link: link.trim(),
        file: fileData,
      }

      const existingResources = JSON.parse(
        localStorage.getItem('academicResources') || '[]'
      )

      localStorage.setItem(
        'academicResources',
        JSON.stringify([
          newResource,
          ...existingResources,
        ])
      )

      setResources((currentResources) => [
        newResource,
        ...currentResources,
      ])

      setTitle('')
      setSubject('')
      setType('')
      setDescription('')
      setLink('')
      setFile(null)
      setShowForm(false)

      alert('Resource added successfully!')
    }

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        saveResource({
          name: file.name,
          data: reader.result,
        })
      }

      reader.readAsDataURL(file)
    } else {
      saveResource()
    }
  }

  const subjects = [
    'All',
    ...new Set(
      resources.map((resource) => resource.subject)
    ),
  ]

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.subject.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText)

    const matchesSubject =
      subjectFilter === 'All' ||
      resource.subject === subjectFilter

    const matchesType =
      typeFilter === 'All' ||
      resource.type === typeFilter

    return (
      matchesSearch &&
      matchesSubject &&
      matchesType
    )
  })

  const openResource = (resource) => {
    if (resource.link) {
      window.open(
        resource.link,
        '_blank',
        'noopener,noreferrer'
      )
      return
    }

    if (resource.file?.data) {
      const newWindow = window.open()

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${resource.file.name}</title>
            </head>
            <body style="margin:0">
              <iframe
                src="${resource.file.data}"
                style="width:100%;height:100vh;border:none;"
              ></iframe>
            </body>
          </html>
        `)
        newWindow.document.close()
      }

      return
    }

    alert('No resource link or file available')
  }

  return (
    <div className="academic-page">

      <section className="academic-header">
        <h1>Academic Resources</h1>

        <p>
          Share and access notes, previous year papers,
          and study materials.
        </p>

        <button
          className="add-resource-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm
            ? 'Close Form'
            : 'Add Resource'}
        </button>
      </section>

      {showForm && (
        <section className="academic-form-section">

          <div className="academic-form-container">

            <h2>Add Academic Resource</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Resource Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Example: DBMS Notes"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>

                <input
                  type="text"
                  value={subject}
                  onChange={(event) =>
                    setSubject(event.target.value)
                  }
                  placeholder="Example: DBMS"
                />
              </div>

              <div className="form-group">
                <label>Resource Type</label>

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                >
                  <option value="">
                    Select resource type
                  </option>

                  <option value="Previous Year Paper">
                    Previous Year Paper
                  </option>

                  <option value="Notes">
                    Notes
                  </option>

                  <option value="Study Material">
                    Study Material
                  </option>

                  <option value="Assignment">
                    Assignment
                  </option>

                  <option value="Other Resource">
                    Other Resource
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe the resource..."
                />
              </div>

              <div className="form-group">
                <label>Resource Link</label>

                <input
                  type="url"
                  value={link}
                  onChange={(event) =>
                    setLink(event.target.value)
                  }
                  placeholder="https://example.com/resource"
                />

                <small>
                  You can provide a link instead of
                  uploading a file.
                </small>
              </div>

              <div className="form-group">
                <label>Upload File</label>

                <input
                  type="file"
                  onChange={(event) =>
                    setFile(event.target.files[0])
                  }
                />

                <small>
                  You can upload a PDF, document, or
                  other study material.
                </small>
              </div>

              <button
                className="submit-resource-button"
                type="submit"
              >
                Add Resource
              </button>

            </form>
          </div>

        </section>
      )}

      <section className="academic-content">

        <div className="academic-toolbar">

          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={subjectFilter}
            onChange={(event) =>
              setSubjectFilter(event.target.value)
            }
          >
            {subjects.map((subjectName) => (
              <option
                key={subjectName}
                value={subjectName}
              >
                {subjectName === 'All'
                  ? 'All Subjects'
                  : subjectName}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="All">
              All Types
            </option>

            <option value="Previous Year Paper">
              Previous Year Papers
            </option>

            <option value="Notes">
              Notes
            </option>

            <option value="Study Material">
              Study Material
            </option>

            <option value="Assignment">
              Assignments
            </option>

            <option value="Other Resource">
              Other Resources
            </option>
          </select>

        </div>

        <h2>Available Resources</h2>

        {filteredResources.length > 0 ? (
          <div className="academic-grid">

            {filteredResources.map((resource) => (
              <div
                className="academic-card"
                key={resource.id}
              >

                <div className="academic-card-icon">
                  📚
                </div>

                <div className="academic-card-content">

                  <div className="academic-card-title">
                    <h3>{resource.title}</h3>

                    <span>
                      {resource.type}
                    </span>
                  </div>

                  <p className="academic-subject">
                    {resource.subject}
                  </p>

                  <p className="academic-description">
                    {resource.description}
                  </p>

                  <button
                    className="view-resource-button"
                    onClick={() =>
                      openResource(resource)
                    }
                  >
                    {resource.link || resource.file
                      ? 'Open Resource'
                      : 'View Resource'}
                  </button>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="no-resources">
            <h3>No resources found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        )}

      </section>

    </div>
  )
}

export default Academic