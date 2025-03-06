import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../Feature/Auth/userSlice'


function Navbar() {
    const navigate  = useNavigate()
    const userState = useSelector((s)=>s.auth)
    console.log('userState', userState)
    const dispatch = useDispatch()

    async function handleLogout(){
      const token = localStorage.getItem("token");
      localStorage.removeItem('token')
      dispatch(logout())
      navigate('/')
      const response = await fetch('http://localhost:8000/api/v1/auth/logout-user',{
        method:'POST',
        headers:{
          "Authorization": `Bearer ${token}`,
          'Content-Type':'application/json'
        },
      })

    }

  return (
    <div className='h-[60px] w-[500px] border absolute top-8 border-primary-500 rounded-full  mx-auto flex align-middle justify-center items-center gap-4 left-1/2 -translate-x-1/2 shadow-lg shadow-gray-800 bg-primary-900'>

        <ul className='flex align-middle justify-center gap-8 md:text-[18px] text-[16px]'>
           {userState.isAuthenticated && <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/home')}>Home</li>}
            <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/pricing')}>Pricing</li>
            <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/about-us')}>About us</li>
            {userState.isAuthenticated === false && <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/')}>Sign In</li>}
           {userState.isAuthenticated && <li className='text-red-700 hover:text-red-900 hover:cursor-pointer' onClick={()=>handleLogout()}>Logout</li>}
        </ul>

    </div>
  )
}

export default Navbar