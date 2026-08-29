import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import './css/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </StrictMode>,
)
