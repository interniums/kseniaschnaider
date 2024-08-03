// @ts-nocheck
import AdminNav from '@/components/AdminNav'
import AdminSearch from '@/components/AdminSearch'
import AdminContext from '@/hooks/AdminContext'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  const AdminData = {
    name: '',
    images: [],
    cost: 0,
    description: '',
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
