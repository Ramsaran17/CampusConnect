const API_URL = 'http://localhost:5000'

const getToken = () => {
  return localStorage.getItem('token')
}

const getAuthHeaders = () => {
  const token = getToken()

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}

/* =========================
   AUTHENTICATION
========================= */

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed')
  }

  return data
}

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Login failed')
  }

  return data
}

export const getMe = async () => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      ...getAuthHeaders(),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user')
  }

  return data
}

export const updateProfile = async (profileData) => {
  const response = await fetch(
    `${API_URL}/api/users/profile`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(profileData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to update profile'
    )
  }

  return data
}

/* =========================
   MARKETPLACE
========================= */

export const getListings = async () => {
  const response = await fetch(`${API_URL}/api/marketplace`)

  if (!response.ok) {
    throw new Error('Failed to fetch marketplace listings')
  }

  return response.json()
}

export const getListing = async (id) => {
  const response = await fetch(
    `${API_URL}/api/marketplace/${id}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch listing')
  }

  return response.json()
}

export const createListing = async (listingData) => {
  const response = await fetch(
    `${API_URL}/api/marketplace`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(listingData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to create listing'
    )
  }

  return data
}

export const updateListing = async (id, listingData) => {
  const response = await fetch(
    `${API_URL}/api/marketplace/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(listingData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to update listing'
    )
  }

  return data
}

export const deleteListing = async (id) => {
  const response = await fetch(
    `${API_URL}/api/marketplace/${id}`,
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete listing')
  }

  return data
}

/* =========================
   LOST & FOUND
========================= */

export const getLostFoundPosts = async () => {
  const response = await fetch(
    `${API_URL}/api/lost-found`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to fetch Lost & Found posts'
    )
  }

  return data
}

export const getLostFoundPost = async (id) => {
  const response = await fetch(
    `${API_URL}/api/lost-found/${id}`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to fetch Lost & Found post'
    )
  }

  return data
}

export const createLostFoundPost = async (postData) => {
  const response = await fetch(
    `${API_URL}/api/lost-found`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(postData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to create Lost & Found post'
    )
  }

  return data
}

export const updateLostFoundPost = async (
  id,
  postData
) => {
  const response = await fetch(
    `${API_URL}/api/lost-found/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(postData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to update Lost & Found post'
    )
  }

  return data
}

export const deleteLostFoundPost = async (id) => {
  const response = await fetch(
    `${API_URL}/api/lost-found/${id}`,
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to delete Lost & Found post'
    )
  }

  return data
}

/* =========================
   ACADEMIC RESOURCES
========================= */

export const getAcademicResources = async () => {
  const response = await fetch(
    `${API_URL}/api/academic-resources`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to fetch academic resources'
    )
  }

  return data
}

export const getAcademicResource = async (id) => {
  const response = await fetch(
    `${API_URL}/api/academic-resources/${id}`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to fetch academic resource'
    )
  }

  return data
}

export const createAcademicResource = async (
  resourceData
) => {
  const response = await fetch(
    `${API_URL}/api/academic-resources`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(resourceData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to create academic resource'
    )
  }

  return data
}

export const updateAcademicResource = async (
  id,
  resourceData
) => {
  const response = await fetch(
    `${API_URL}/api/academic-resources/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(resourceData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to update academic resource'
    )
  }

  return data
}

export const deleteAcademicResource = async (id) => {
  const response = await fetch(
    `${API_URL}/api/academic-resources/${id}`,
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to delete academic resource'
    )
  }

  return data
}