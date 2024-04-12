import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/logo.png';
import user1 from '../assets/user.jpeg';
import { categories } from '../utils/data';


const isActiveStyle = 'bg-blue-200 h-[45px] shadow-lx flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize '; // Updated isActiveStyle
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-black font-bold hover:text-black transition-all duration-200 ease-in-out capitalize';


const Sidebar = ({ closeToggle }) => {

  const handleCloseSiderbar = () => {
    if(closeToggle) closeToggle(false);
  }

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='flex flex-col justify-between bg-blue-100 pindetail h-[100%] overflow-y-scrikk min-w-210 hide-scrollbar rounded-[25px]'>
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSiderbar}
        >
          <img src={logo} alt="logo" className='w-full' />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSiderbar}
          >
            <RiHomeFill className='w-[2rem] h-[2rem]' />
            Home
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>

          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSiderbar} 
              key={category.name}
            >
              <div></div>
              <img 
                src={category.image} 
                className="w-10 h-10 rounded-[15px] shadow-sm"
                alt="category" 
              />
              {category.name} 
            </NavLink>
          ))}
        </div>
      </div>

      <Link
        to={`user-profile/${user?._id}`}
        className='flex my-5 mb-[4.5rem] gap-2 p-2 items-center bg-blue-200 rounded-lg shadow-lg mx-3 sm:mb-[10rem]'
        onClick={handleCloseSiderbar}
      >
        <img src={user?.image || user1} className="w-15 h-12 rounded-[25px]" alt="user-profile" />
        <p>{user?.userName || 'Guest'}</p>
        <IoIosArrowForward />
      </Link>
    </div>
  )
}

export default Sidebar
