import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function AppLayout() {
  return (
    <div className='h-[100dvh] w-[100dvw] bg-primary-950 text-white text-xl max-w-[1600px] overflow-x-hidden relative mx-auto'> 
    <Navbar />
    <Outlet />
    </div>
  )
}

export default AppLayout