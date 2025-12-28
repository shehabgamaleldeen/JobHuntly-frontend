import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const ScrollManager = () => {
  const location = useLocation()
  const navType = useNavigationType()
  const positions = useRef<Record<string, number>>({})

  useEffect(() => {
    if (navType === 'POP') {
      window.scrollTo(0, positions.current[location.key] || 0)
    } else {
      window.scrollTo(0, 0)
    }

    return () => {
      positions.current[location.key] = window.scrollY
    }
  }, [location, navType])

  return null
}

export default ScrollManager
