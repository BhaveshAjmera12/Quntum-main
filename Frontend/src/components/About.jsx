import React from 'react';

const About = () => {
  return (
    <div className='w-full p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black'>
      <h1 className='font-["Neue_Montreal"] text-[4vw] leading-[3.4vw] tracking-tight font-bold text-center'>
        Discover Quantum – Elevating Your Laptop Shopping Experience
      </h1>
      
      <div className='mt-20 w-full text-center'>
        <h2 className='text-6xl font-extrabold mb-6'>Get in Touch</h2>
        <p className='text-2xl leading-relaxed max-w-4xl mx-auto'>
          Have questions? Reach out to us at <strong>support@quantum.com</strong> or call <strong>+91 98765 43210</strong>.
        </p>
        <p className='text-2xl leading-relaxed max-w-4xl mx-auto mt-4'>
          <strong>Company Name:</strong> Quantum
        </p>
        <p className='text-2xl leading-relaxed max-w-4xl mx-auto'>
          <strong>Address:</strong> 123 Tech Street, Quantum City, QC 45678
        </p>
        <p className='text-2xl leading-relaxed max-w-4xl mx-auto'>
          <strong>Customer Support Timings:</strong> Monday to Saturday, 9 AM - 6 PM
        </p>
        <p className='text-2xl leading-relaxed max-w-4xl mx-auto'>
          Follow us on:
          <a href='#' className='text-blue-600 ml-2'>Facebook</a>,
          <a href='#' className='text-blue-600 ml-2'>Twitter</a>,
          <a href='#' className='text-blue-600 ml-2'>Instagram</a>,
          <a href='#' className='text-blue-600 ml-2'>LinkedIn</a>
        </p>
      </div>

      <div className='mt-20 w-full text-center'>
        <h2 className='text-6xl font-extrabold mb-6'>Why Choose Quantum?</h2>
        <div className='flex flex-wrap justify-center gap-10 text-2xl leading-relaxed max-w-6xl mx-auto'>
          <div className='bg-white text-black p-8 rounded-2xl shadow-lg w-80'>
            <h3 className='font-bold text-3xl mb-4'>Top Brands</h3>
            <p>Apple, HP, Acer and Samsung – all in one place.</p>
          </div>
          <div className='bg-white text-black p-8 rounded-2xl shadow-lg w-80'>
            <h3 className='font-bold text-3xl mb-4'>Best Prices</h3>
            <p>Enjoy exclusive deals and competitive pricing on all laptops.</p>
          </div>
          <div className='bg-white text-black p-8 rounded-2xl shadow-lg w-80'>
            <h3 className='font-bold text-3xl mb-4'>Seamless Shopping</h3>
            <p>Secure and user-friendly shopping experience, from browsing to checkout.</p>
          </div>
          <div className='bg-white text-black p-8 rounded-2xl shadow-lg w-80'>
            <h3 className='font-bold text-3xl mb-4'>Reliable Support</h3>
            <p>Our customer service team is always ready to assist you with any queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
