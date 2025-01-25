import SuppliersPage from '@/suppliers/ui/pages/SuppliersPage'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import NotFoundPage from '../ui/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '',
    element: <Navigate to='/suppliers' />
  },
  {
    path: 'suppliers',
    element: <SuppliersPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])