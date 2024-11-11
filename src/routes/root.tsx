'use client'

import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, InboxUnread, UserSettings } from 'geist-icons';
import Logo from '@/assets/cropped-logo.svg?react'

export default function Layout() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Quickstay'
      case '/matches':
        return 'Matches'
      case '/profile':
        return 'Profile'
      default:
        return 'Quickstay'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <Logo className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">{getTitle(location.pathname)}</h1>
        </div>
        <nav>
          <div className="flex items-center border-2 border-black rounded-full p-1 space-x-4">
            <Link
              to="/"
              className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive('/') ? 'bg-white text-primary shadow' : 'text-gray-600'
                }`}
            >
              <Home width="16px" />
              <span className="sr-only">Home</span>
            </Link>
            <Link
              to="/matches"
              className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive('/matches') ? 'bg-white text-primary shadow' : 'text-gray-600'
                }`}
            >
              <InboxUnread width="16px" />
              <span className="sr-only">Matches</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive('/profile') ? 'bg-white text-primary shadow' : 'text-gray-600'
                }`}
            >
              <UserSettings width="16px" />
              <span className="sr-only">Profile</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}