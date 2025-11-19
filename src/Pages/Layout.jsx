import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Navbar */}
      <header className="md:w-[15vw] w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-[#F3F4F6] min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
