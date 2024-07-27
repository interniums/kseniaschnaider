import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AdminPage from './pages/AdminPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: '/admin-page',
    element: <AdminPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
