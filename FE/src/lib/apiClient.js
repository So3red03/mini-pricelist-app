const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'

const apiClient = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(errorBody || 'API request failed')
  }

  return response.json()
}

export { API_BASE_URL, apiClient }
