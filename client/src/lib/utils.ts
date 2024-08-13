// @ts-nocheck
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCategories = async () => {
  let res
  await axios.get('http://localhost:3000/category').then((response) => {
    res = response.data
  })
  return res
}

export const getCollections = async () => {
  let res
  await axios.get('http://localhost:3000/collection').then((response) => {
    res = response.data
  })
  return res
}

export const getSales = async () => {
  let res
  await axios.get('http://localhost:3000/sale').then((response) => {
    res = response.data
  })
  return res
}

export const getItems = async () => {
  let res
  await axios.get('http://localhost:3000/item').then((response) => {
    res = response.data
  })
  return res
}

export const getItem = async (_id) => {
  let res
  await axios.get(`http://localhost:3000/item/get/${_id}`).then((response) => {
    res = response.data
  })
  return res
}
