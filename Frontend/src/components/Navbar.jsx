import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Quantumlogo from '/Your-paragraph-text.svg';
import { useCart } from '../context/CartContext';
import { FaSearch } from 'react-icons/fa';

function Navbar() {
  const { cart, token, logout } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown

  const cartCount = Array.isArray(cart) 
    ? cart.reduce((total, item) => total + (item.quantity || 0), 0) 
    : 0;

  const handleProtectedAction = (path) => {
    if (!token && path === '/cart') {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='fixed z-[999] w-full px-4 py-2 text-black font-["NeueMontreal"]'>
      <div className='flex justify-between items-center bg-white rounded-4xl px-4 border-1 border-gray-300'>
        <div className='logo'>
          <img 
            className='relative top-[-20px] h-25 left-[-35px] font-extrabold' 
            src={Quantumlogo} 
            alt='Quantum Logo' 
          />
        </div>
        <div className='links flex gap-10 items-center'>
          <Link to='/' className='text-3xl capitalize font-black hover:border-b-2 border-black'>HOME</Link>
          <Link to='/profile' className='text-3xl capitalize font-black hover:border-b-2 border-black'>PROFILE</Link>
          <button 
            onClick={() => handleProtectedAction('/cart')} 
            className='text-3xl capitalize font-black hover:border-b-2 border-black'>
            CART ({cartCount})
          </button>
          {token ? (
            <button 
              onClick={logout} 
              className='text-3xl capitalize font-black hover:border-b-2 border-black'>
              LOGOUT
            </button>
          ) : (
            <Link to='/login' className='text-3xl capitalize font-black hover:border-b-2 border-black'>LOGIN</Link>
          )}
          <Link to='/shop' className='text-3xl capitalize font-black hover:border-b-2 border-black'>SHOP</Link>
          
          {/* Quick Find Dropdown */}
          <div className='relative ml-8' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className='text-3xl font-bold flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300'
            >
              <span className='text-4xl'>Find</span> <FaSearch className='text-2xl' />
            </button>
            {dropdownOpen && (
              <div className='absolute top-12 -left-[7vw] bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col gap-2 w-52'>
                <Link to='/gaming' className='text-xl text-red-500 hover:bg-red-100 p-2 rounded-md transition duration-300'>Gaming Laptop</Link>
                <Link to='/business' className='text-xl text-blue-500 hover:bg-blue-100 p-2 rounded-md transition duration-300'>Business Laptop</Link>
                <Link to='/budget' className='text-xl text-green-500 hover:bg-green-100 p-2 rounded-md transition duration-300'>Budget Laptop</Link>
                <Link to='/student' className='text-xl text-purple-500 hover:bg-purple-100 p-2 rounded-md transition duration-300'>Student Laptop</Link>
                <Link to='/apple' className='text-xl text-gray-900 hover:bg-gray-200 p-2 rounded-md transition duration-300'>Apple</Link>
                <Link to='/hp' className='text-xl text-yellow-500 hover:bg-yellow-100 p-2 rounded-md transition duration-300'>HP</Link>
                <Link to='/acer' className='text-xl text-teal-500 hover:bg-teal-100 p-2 rounded-md transition duration-300'>Acer</Link>
                <Link to='/samsung' className='text-xl text-indigo-500 hover:bg-indigo-100 p-2 rounded-md transition duration-300'>Samsung</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
