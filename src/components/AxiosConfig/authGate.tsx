import { useEffect, useState } from "react"
import axios from 'axios' 

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken")
      const refreshToken = localStorage.getItem("refreshToken")

      if (!accessToken && !refreshToken) {
        await new Promise((res) => setTimeout(res, 500)) 
        setReady(true)
        return
      }

      try {
        //Silent validation request
        await axios.get("/auth/me")
      } catch {
        //interceptor will handle redirect
      } finally {
        setReady(true)
      }
    }

    checkAuth()
  }, [])

  if (!ready) {
      return ( //spinner
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
    </div>
  )
  }

  return <>{children}</>
}
