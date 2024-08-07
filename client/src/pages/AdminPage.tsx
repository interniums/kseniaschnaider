// @ts-nocheck
import AdminNav from '@/components/AdminNav'
import AdminSearch from '@/components/AdminSearch'
import AdminContext from '@/hooks/AdminContext'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  const [input, setInput] = useState('')
  const AdminData = {
    name: '',
    images: [],
    cost: 0,
    description: '',
    input,
    setInput,
  }

  return (
    <AdminContext.Provider value={AdminData}>
      <AdminSearch />
      <AdminNav />
      <Outlet />
    </AdminContext.Provider>
  )
}

export default AdminPage
