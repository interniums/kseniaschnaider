// @ts-nocheck
import AdminNav from '@/components/AdminNav'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <>
      <AdminNav />
      <Outlet />
      <main>
        <div></div>
      </main>
    </>
  )
}

export default AdminPage
