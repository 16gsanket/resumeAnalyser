import React from 'react'
import UploadUi from '../Ui/UploadUi'


function HomePage() {
  return (
    <div className='h-full w-full pt-10 overflow-y-scroll'>
      <UploadUi />
      <div className='h-[48dvh] w-full bg-primary-950 pt-20'>
        <div className='lg:w-[1200px] w-full h-fit mx-auto '>

        <h1 className='text-[50px] text-center font-light'>Get Your <span className='text-accent-500 font-semibold text-[55px]'>Resume Analysed</span>  and <span className='text-green-300 font-semibold text-[55px]'>Get Hired </span> !</h1>
        <h3 className='mt-16 text-[25px] pl-4 text-center'>Using the latest Gen AI we curate a analysis perfect for your Resume, so you can <span className='text-accent-500 font-semibold text-[30px]'>Get Hired</span> </h3>
        </div>

      </div>
      <div className='h-[600px] w-full bg-red-600'></div>
    </div>
  )
}

export default HomePage