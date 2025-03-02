import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate  = useNavigate()
  return (
    <div className='h-[60px] w-[500px] border absolute top-8 border-primary-200 rounded-full  mx-auto flex align-middle justify-center items-center gap-4 left-1/2 -translate-x-1/2 '>

        <ul className='flex align-middle justify-center gap-8 md:text-[18px] text-[16px]'>
            <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/home')}>Home</li>
            <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/pricing')}>Pricing</li>
            <li className='hover:text-accent-500 hover:cursor-pointer' onClick={()=>navigate('/about-us')}>About us</li>
        </ul>

    </div>
  )
}

export default Navbar