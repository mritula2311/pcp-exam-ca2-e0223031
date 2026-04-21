import axios from 'axios'
import { createFallbackAppData } from './fallbackData'

const BASE_URL = 'https://t4e-testserver.onrender.com/api'
const REQUEST_TIMEOUT = 8000

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  }, {
    timeout: REQUEST_TIMEOUT,
  })

  return data
}

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: REQUEST_TIMEOUT,
  })

  return data.data
}

export const fetchAppData = async (studentId, password, set) => {
  try {
    const tokenResponse = await getToken(studentId, password, set)
    const token =
      tokenResponse?.token ||
      tokenResponse?.access_token ||
      tokenResponse?.accessToken ||
      tokenResponse?.jwt
    const dataUrl = tokenResponse?.dataUrl || tokenResponse?.data_url

    if (!token) {
      throw new Error('Token missing in response')
    }

    if (!dataUrl) {
      throw new Error('Data URL missing in response')
    }

    return await getDataset(token, dataUrl)
  } catch (error) {
    console.warn('Falling back to local order data after API failure.', error)
    return createFallbackAppData()
  }
}
