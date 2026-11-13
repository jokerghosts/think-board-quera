import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Outlet />
      </main>
      <Toaster position="bottom-center" toastOptions={{ className: 'bg-base-100! text-base-content!' }} />
    </div>
  )
}
