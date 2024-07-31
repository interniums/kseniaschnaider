// @ts-nocheck
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const collections = [
  'some collection1',
  'some collection2',
  'some collection3',
  'some collection4',
  'some collection5',
  'some collection6',
  'some collection7',
  'some collection8',
  'some collection9',
  'some collection10',
  'some collection11',
  'some collection12',
  'some collection13',
  'some collection14',
  'some collection15',
  'some collection16',
]

export const getCategories = async () => {
  let res
  await axios.get('http://localhost:3000/category').then((response) => {
    res = response.data
  })
  return res
}
