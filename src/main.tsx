import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, type RouteObject } from 'react-router'
import { router } from './router/index.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(router as RouteObject[])} />
  </StrictMode>,
)
