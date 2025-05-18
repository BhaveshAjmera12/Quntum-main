import React from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../components/LandingPage'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Featured from '../components/Featured'
import Brand from '../components/Brand'




const Homepage = () => {
  return (
    <div className='w-hull min-h-screen text-white bg-[#0c57ad]'>
      <Navbar />
      <LandingPage />
      <Marquee/>
      <Featured/>
      <Brand/>
      <About/>
     
    </div>
  )
}

export default Homepage