// @ts-nocheck
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AdminPage from './pages/AdminPage'
import AdminForm from './components/AdminForm'
import AdminHome from './components/AdminHome'
import ItemSuccess from './components/ItemSuccess'
import AdminCollection from './components/AdminCollection'
import AdminCategory from './components/AdminCategory'
import path from 'path'
import AdminItems from './components/AdminItems'
import AdminItem from './components/AdminItem'
import ErrorComponent from './components/ErrorComponent'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/admin-page',
    element: <AdminPage />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/admin-page',
        element: <AdminHome />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin-page/item-form',
        element: <AdminForm />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin-page/item-form/success',
        element: <ItemSuccess />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin-page/item',
        element: <AdminItems />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin-page/item/:id',
        element: <AdminItem />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin-page/collection/:id',
        element: <AdminCollection />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin-page/category/:id',
        element: <AdminCategory />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
