import { useState, useEffect } from 'react'
import mainImage from '../../../assets/images/Logo.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PremiumNotification from '../../Premium/PremiumNotification'
import NotificationDropdown from '@/components/ui/notificationDropdown'
import instance from '@/components/AxiosConfig/instance'

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isPremium, setIsPremium] = useState(Boolean)
  const [openMenu, setOpenMenu] = useState(false)

  const navigate = useNavigate()
  const location = useLocation() // To detect URL changes like ?payment=success

  // Function to fetch user data
  const fetchUserStatus = async () => {
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
    if (token) {
      try {
        const { data } = await instance.get('/auth/me') // Use your actual profile endpoint
        
        setIsAuthenticated(true)
        setUserRole(data.user.role)
        setIsPremium(data.user.isPremium) // Get the truth from the DB
        localStorage.setItem('isPremium', String(isPremium))
      } catch (error) {
        console.error("Auth verify failed", error)
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
    userRole === 'COMPANY' ? navigate('/DashboardRecruiter') : navigate('/Dashboard')
    setOpenMenu(false)
  }

  const handleLogout = () => {
    ['accessToken', 'refreshToken', 'role'].forEach(key => {
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
            <Link to="/"><img src={mainImage} alt="Logo" /></Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/find-jobs" className="text-gray-700 text-sm font-medium">Find Jobs</Link>
              <Link to="/browse-companies" className="text-gray-700 text-sm font-medium">Browse Companies</Link>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Show Premium badge only for Job Seekers & Guests */}
            {userRole !== 'COMPANY' && <PremiumNotification isPremium={isPremium} />}

            {!isAuthenticated ? (
              <div className="flex gap-2">
                <Link to="/login" className="px-6 py-2 text-indigo-600 text-sm font-medium">Login</Link>
                <Link to="/signup" className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md">Sign Up</Link>
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
                    <button onClick={handleAvatarClick} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Dashboard</button>
                    {/* New Link: Subscription for Companies */}
                    {userRole === 'COMPANY' && (
                      <Link to="/pricing" className="block px-4 py-2 text-sm hover:bg-gray-100">Plans & Credits</Link>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
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