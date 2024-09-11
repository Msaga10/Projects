import React from 'react'
import profile from '../assets/profile.png'
import { NavLink } from 'react-router-dom'
function LogedInUser() {
  return (
    <NavLink to="/Dashboard" className='flex items-center justify-center gap-1 px-1 bg-blue-600 rounded-full w-max h-max'>
        <img src={profile} alt="profile" className='h-5 m-1 rounded-full border-[1px] border-white p-[1px]' />
      Name1
    </NavLink>
  )
}

export default LogedInUser
