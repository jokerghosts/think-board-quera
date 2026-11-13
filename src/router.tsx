import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { CreateNotePage } from './pages/CreateNotePage'
import { EditNotePage } from './pages/EditNotePage'
import { HomePage } from './pages/HomePage'
import { NoteDetailPage } from './pages/NoteDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'notes/new', element: <CreateNotePage /> },
      { path: 'notes/:id', element: <NoteDetailPage /> },
      { path: 'notes/:id/edit', element: <EditNotePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
