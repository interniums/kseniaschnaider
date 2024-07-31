// @ts-nocheck
import AdminNav from '@/components/AdminNav'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <>
      <AdminNav />
      <Outlet />
    </>
  )
}

export default AdminPage
