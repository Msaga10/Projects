import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className='flex justify-around bg-dark-blue min-h-[30px] p-6'>
      <NavLink to="/FAQ" className='text-white'>FAQ</NavLink>
      <NavLink to="TandC" className='text-white'>Terms & Conditions</NavLink>
      <NavLink to="ContactUs" className='text-white'>Contact Us</NavLink>
    </footer>
  )
}

export default Footer
