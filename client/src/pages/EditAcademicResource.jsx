import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAcademicResource,
  getMe,
  updateAcademicResource,
} from '../api'
import './Academic.css'

const resourceTypeOptions = [
  {
    value: 'question-paper',
    label: 'Previous Year Paper',
  },
  {
    value: 'notes',
    label: 'Notes',
  },
  {
    value: 'study-material',
    label: 'Study Material',
  },
  {
    value: 'assignment',
    label: 'Assignment',
  },
  {
    value: 'other',
    label: 'Other',
  },
]

function EditAcademicResource() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [resource, setResource] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [semester, setSemester] = useState('')
  const [resourceType, setResourceType] = useState('')
  const [fileUrl, setFileUrl] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadResource()
  }, [id])

  const loadResource = async () => {
    try {
      setLoading(true)
      setError('')

      const [resourceData, userData] =
        await Promise.all([
          getAcademicResource(id),
          getMe(),
        ])

      const loadedResource = resourceData.resource

      setResource(loadedResource)
      setCurrentUser(userData.user)

      setTitle(loadedResource.title || '')
      setDescription(
        loadedResource.description || ''
      )
      setSubject(loadedResource.subject || '')
      setDepartment(
        loadedResource.department || ''
      )
      setYear(
        loadedResource.year
          ? String(loadedResource.year)
          : ''
      )
      setSemester(
        loadedResource.semester
          ? String(loadedResource.semester)
          : ''
      )
      setResourceType(
        loadedResource.resourceType || ''
      )
      setFileUrl(loadedResource.fileUrl || '')
    } catch (error) {
      console.error(
        'Failed to load academic resource:',
        error
      )

      setError(
        error.message ||
          'Failed to load academic resource'
      )
    } finally {
      setLoading(false)
    }
  }

  const isOwner =
    resource &&
    currentUser &&
    String(resource.uploadedBy?._id) ===
      String(currentUser._id)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isOwner) {
      alert(
        'You can only edit your own academic resources'
      )
      return
    }

    if (!title.trim()) {
      alert('Please enter a resource title')
      return
    }

    if (!subject.trim()) {
      alert('Please enter a subject')
      return
    }

    if (!department.trim()) {
      alert('Please enter a department')
      return
    }

    if (!year) {
      alert('Please select a year')
      return
    }

    if (!semester) {
      alert('Please select a semester')
      return
    }

    if (!resourceType) {
      alert('Please select a resource type')
      return
    }

    if (!fileUrl.trim()) {
      alert('Please provide a resource URL')
      return
    }

    try {
      setSaving(true)

      await updateAcademicResource(id, {
        title: title.trim(),
        description: description.trim(),
        subject: subject.trim(),
        department: department.trim(),
        year: Number(year),
        semester: Number(semester),
        resourceType,
        fileUrl: fileUrl.trim(),
      })

      alert(
        'Academic resource updated successfully'
      )

      navigate(`/academic/${id}`)
    } catch (error) {
      console.error(
        'Failed to update academic resource:',
        error
      )

      alert(
        error.message ||
          'Failed to update academic resource'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="academic-details-page">
        <div className="academic-details-not-found">
          <h1>Loading...</h1>
        </div>
      </div>
    )
  }

  if (error || !resource) {
    return (
      <div className="academic-details-page">
        <div className="academic-details-not-found">
          <h1>Resource Not Found</h1>

          <p>
            {error ||
              'This academic resource is no longer available.'}
          </p>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="academic-details-page">
        <div className="academic-details-not-found">

          <h1>Access Denied</h1>

          <p>
            You can only edit your own academic resources.
          </p>

          <a href={`/academic/${id}`}>
            ← Back to Resource
          </a>

        </div>
      </div>
    )
  }

  return (
    <div className="academic-page">

      <section className="academic-header">

        <h1>Edit Academic Resource</h1>

        <p>
          Update the details of your academic resource.
        </p>

      </section>

      <section className="academic-form-section">

        <div className="academic-form-container">

          <h2>Edit Resource</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Resource Title</label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
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
              />

            </div>

            <div className="form-group">

              <label>Department</label>

              <input
                type="text"
                value={department}
                onChange={(event) =>
                  setDepartment(
                    event.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Year</label>

              <select
                value={year}
                onChange={(event) =>
                  setYear(event.target.value)
                }
              >

                <option value="">
                  Select year
                </option>

                <option value="1">
                  1st Year
                </option>

                <option value="2">
                  2nd Year
                </option>

                <option value="3">
                  3rd Year
                </option>

                <option value="4">
                  4th Year
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>Semester</label>

              <select
                value={semester}
                onChange={(event) =>
                  setSemester(
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select semester
                </option>

                {Array.from(
                  { length: 8 },
                  (_, index) => (
                    <option
                      key={index + 1}
                      value={index + 1}
                    >
                      Semester {index + 1}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="form-group">

              <label>Resource Type</label>

              <select
                value={resourceType}
                onChange={(event) =>
                  setResourceType(
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select resource type
                </option>

                {resourceTypeOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}

              </select>

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
              />

            </div>

            <div className="form-group">

              <label>Resource URL</label>

              <input
                type="url"
                value={fileUrl}
                onChange={(event) =>
                  setFileUrl(
                    event.target.value
                  )
                }
              />

            </div>

            <button
              className="submit-resource-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : 'Save Changes'}
            </button>

          </form>

        </div>

      </section>

    </div>
  )
}

export default EditAcademicResource