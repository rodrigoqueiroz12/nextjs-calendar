import axios from 'axios'

const url = process.env.NEXT_PUBLIC_API_URL
const holidayUrl = process.env.NEXT_PUBLIC_HOLIDAY_API_URL

export const api = axios.create({
  baseURL: url,
})

export const holidayApi = axios.create({
  baseURL: holidayUrl,
})
