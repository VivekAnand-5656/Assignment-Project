import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Images/user.jpg';
import Boy from '../Images/boy.jpg';

const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu toggle

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-lg">
        <img src={Logo} alt="Logo" className="w-40 object-contain" />
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-gray-700 focus:outline-none"
        >
          {open ? '✖' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen sm:w-[15vw] w-screen rounded-2xl bg-white shadow-lg
          p-4 flex flex-col justify-between items-center transition-transform duration-300
          md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <img src={Logo} alt="Logo" className="w-24 h-24 object-contain mb-4" />

        <div className="w-full flex flex-col gap-4 font-semibold">
          <hr className="border-gray-300" />
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[#E9F4FF] text-[#0b07ff] pb-1 p-2 rounded shadow-md"
                : "hover:text-[#42457f] hover:scale-105 transition-transform duration-200"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-user"
            className={({ isActive }) =>
              isActive
                ? "bg-[#E9F4FF] text-[#0b07ff] pb-1 p-2 rounded shadow-md"
                : "hover:text-[#42457f] hover:scale-105 transition-transform duration-200"
            }
          >
            Create User
          </NavLink>
        </div>

        <img src={Boy} alt="Avatar" className="w-16 h-16 rounded-full object-cover mb-2" />
      </nav>

      {/* Overlay for mobile menu */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed  bg-black/30 md:hidden z-10"
        ></div>
      )}
    </>
  )
}

export default Navbar;
