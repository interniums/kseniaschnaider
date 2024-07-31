import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AdminPage from './pages/AdminPage'
import AdminForm from './components/AdminForm'
import AdminHome from './components/AdminHome'
import ItemSuccess from './components/ItemSuccess'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin-page',
    element: <AdminPage />,
    children: [
      {
        path: '/admin-page',
        element: <AdminHome />,
      },
      {
        path: '/admin-page/item-form',
        element: <AdminForm />,
      },
      {
        path: '/admin-page/item-form/success',
        element: <ItemSuccess />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
