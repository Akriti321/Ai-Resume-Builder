import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AppContext } from '../context/AppContext'

const Layout = () => {
  const { token } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login?state=login')
    }
  }, [token, navigate])

  return (
    <div>
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <Outlet />
        </div>
    </div>
  )
}

export default Layout