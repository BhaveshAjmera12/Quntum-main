import React, { useState } from 'react'

const LandingPage = () => {
  const slides = [
    {
      text: ['Play', 'Work', 'Create'],
    }
  ]
  return (
    <div className='main-div w-full h-screen bg-gradient-to-b from-[#F3F6FB] via-[#134e92]  to-[#0c57ad] pt-[12vw] bg-[url("frontpageimage.jpg")] bg-cover bg-center'>
      
   <div className="textarea flex justify-between items-center">
   <div className="textt text-black leading-none relative bottom-[4vw]">
    <h1 className='text-[12vw] font-black stroke-text'>Play</h1>
    <h1 className='text-[12vw] mt-[-2vw]  font-black stroke-text'>Work</h1>
    <h1 className='text-[13vw] font-black mt-[-3vw] z-[99] stroke-text'>Create</h1>
   </div> bg-center
   {/* <div className="im absolute ml-[30vw] mb-[4vw]">
    <img className='h-[43vw]' src="human1.avif" alt="" /> 
   </div> */}
   {/* <div className='para w-[27vw] h-[40vh] mt-12 text-3xl'>
    <p className='font-[400] text-black' style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>" Welcome to the ultimate laptop universe! Whether you're a tech geek, a student on a budget, or a pro seeking power—your perfect machine awaits. 💻 Explore, compare & find the laptop that matches your vibe! Ready to upgrade? Let’s dive in!"</p>
   </div> */}
   </div>

   
    </div>
  )
}
 
export default LandingPage