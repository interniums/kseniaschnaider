import { Outlet } from 'react-router-dom'

const AdminAddItem = () => {
  return (
    <main className="abosulute inset-0 py-12 px-40 flex w-full h-screen justify-center items-center">
      <Outlet />
    </main>
  )
}

export default AdminAddItem
