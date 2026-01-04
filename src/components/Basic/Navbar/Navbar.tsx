import React, { useState, useEffect } from 'react'
import mainImage from '../../../assets/images/Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import PremiumNotification from '../../Premium/PremiumNotification'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => !!sessionStorage.getItem('accessToken')
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState(false)

  const navigate = useNavigate()
  const [isPremium, setIsPremium] = React.useState(
    () => localStorage.getItem('isPremium') === 'true'
  )

  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!sessionStorage.getItem('accessToken'))
      setIsPremium(localStorage.getItem('isPremium') === 'true')
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')
    const role = sessionStorage.getItem('role')

    if (accessToken) {
      setIsAuthenticated(true)
      setUserRole(role)
    } else {
      setIsAuthenticated(false)
      setUserRole(null)
    }
  }, [])

  const handleAvatarClick = () => {
    if (userRole === 'COMPANY') {
      navigate('/DashboardRecruiter')
    } else if (userRole === 'JOB_SEEKER') {
      navigate('/Dashboard')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    localStorage.removeItem('isPremium')
    sessionStorage.removeItem('role')

    setOpenMenu(false)
    navigate('/login')
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-10">
            <Link to="/">
              <img src={mainImage} alt="JobHuntly logo" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/find-jobs" className="text-gray-700 text-sm font-medium">
                Find Jobs
              </Link>
              <Link
                to="/browse-companies"
                className="text-gray-700 text-sm font-medium"
              >
                Browse Companies
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <PremiumNotification isPremium={isPremium} />

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-indigo-600 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium hover:bg-indigo-700"
                >
                  {userRole === 'COMPANY' ? 'C' : 'U'}
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <button
                      onClick={handleAvatarClick}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
