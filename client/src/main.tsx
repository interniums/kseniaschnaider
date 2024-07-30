import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AdminPage from './pages/AdminPage'
import AdminAddItem from './components/AdminDashboard'
import AdminForm from './components/AdminForm'
import AdminFormImages from './components/AdminFormImages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin-page',
    element: <AdminPage />,
  },
  {
    path: '/admin-page/item-form',
    element: <AdminAddItem />,
    children: [
      {
        path: '/admin-page/item-form/page-1',
        element: <AdminForm />,
      },
      {
        path: '/admin-page/item-form/page-2',
        element: <AdminFormImages />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
