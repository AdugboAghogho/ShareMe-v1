import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import user1 from '../assets/user.jpeg';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  // if(!user) return null;

  return (
    <div className='flex bg-gray-100 rounded-xl gap-2 md:gap-5 w-full h-[5rem] mt-5 pb-[5px]'>
      <div className="flex justify-start items-center w-full px-2  bg-white-100 rounded-xl border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className='ml-1' />
        <input 
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-gray-200 rounded-xl outline-none'
        />
      </div>

      <div className="flex gap-3">
        <Link
          to={`user-profile/${user?._id}`}
          // to={`/user-profile/${postedBy?._id}`}
          className='hidden md:block'
        >
          {/* <img src={vee1} alt="user" className='w-14 h-12 mt-3 rounded-lg' /> */}
          <img src={user?.image || user1} alt="user-pic" className="w-14 h-12 mt-3 rounded-lg " />
        </Link>

        <Link
          to='/create-pin'
          className='bg-black text-white rounded-lg w-12 h-12 mt-3 md:w-14 md:h-12 flex justify-center items-center'
        >
          <IoMdAdd  />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
 