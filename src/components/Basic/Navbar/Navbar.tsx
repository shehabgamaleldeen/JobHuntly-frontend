import { useState, useEffect } from 'react'
import mainImage from '../../../assets/images/Logo.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PremiumNotification from '../../Premium/PremiumNotification'
import NotificationDropdown from '@/components/ui/notificationDropdown'
import instance from '@/components/AxiosConfig/instance'
import { Menu } from 'lucide-react'

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isPremium, setIsPremium] = useState(Boolean)
  const [openMenu, setOpenMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation() // To detect URL changes like ?payment=success

  // Function to fetch user data
  const fetchUserStatus = async () => {
    const token =
      sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
    if (token) {
      try {
        const { data } = await instance.get('/auth/me') // Use your actual profile endpoint

        setIsAuthenticated(true)
        setUserRole(data.user.role)
        setIsPremium(data.user.isPremium) // Get the truth from the DB
        localStorage.setItem('isPremium', String(isPremium))
      } catch (error) {
        console.error('Auth verify failed', error)
        handleLogout()
      }
    }
  }

  // 1. Run on Mount
  useEffect(() => {
    fetchUserStatus()
  }, [isPremium])

  // 2. Watch for Stripe Redirects (If URL has ?payment=success, refresh data)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('payment') === 'success') {
      fetchUserStatus()
    }
  }, [location])

  const handleAvatarClick = () => {
    userRole === 'COMPANY'
      ? navigate('/DashboardRecruiter')
      : navigate('/Dashboard')
    setOpenMenu(false)
  }

  const handleLogout = () => {
    ;['accessToken', 'refreshToken', 'role'].forEach((key) => {
      sessionStorage.removeItem(key)
      localStorage.removeItem(key)
    })
    setIsAuthenticated(false)
    setIsPremium(false)
    setOpenMenu(false)
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-10">
            <Link to="/">
              <img src={mainImage} alt="Logo" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/find-jobs"
                className="text-gray-700 text-sm font-medium"
              >
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
            {/* Mobile Menu Trigger - Only show when NOT authenticated */}
            {!isAuthenticated && (
              <div className="md:hidden flex items-center mr-2 relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 focus:outline-none"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>

                {mobileMenuOpen && (
                  <div className="absolute right-0 top-12 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 py-1">
                    <Link
                      to="/find-jobs"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Find Jobs
                    </Link>
                    <Link
                      to="/browse-companies"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Browse Companies
                    </Link>
                    <div className="h-px bg-gray-200 my-1" />
                    <Link
                      to="/login"
                      className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Show Premium badge only for Job Seekers & Guests */}
            {userRole !== 'COMPANY' && (
              <PremiumNotification isPremium={isPremium} />
            )}

            {!isAuthenticated ? (
              <div className="hidden md:flex gap-2">
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
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <NotificationDropdown />
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium"
                >
                  {userRole === 'COMPANY' ? 'C' : 'U'}
                </button>

                {openMenu && (
                  <div className="absolute right-0 top-12 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 py-1">
                    {/* Mobile-only Navigation Links for Logged-in Users */}
                    <div className="md:hidden">
                      <Link
                        to="/find-jobs"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpenMenu(false)}
                      >
                        Find Jobs
                      </Link>
                      <Link
                        to="/browse-companies"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpenMenu(false)}
                      >
                        Browse Companies
                      </Link>
                      <div className="h-px bg-gray-200 my-1" />
                    </div>

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