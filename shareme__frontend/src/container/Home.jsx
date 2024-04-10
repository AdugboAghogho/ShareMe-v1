import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle} from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { client } from '../client';
// import logo from '../assets/logo.png';
import vee1 from '../assets/vee1.jpg';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';


const Home = () => {
  const user1 = JSON.parse(localStorage.getItem('user'));

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
     .then((data) => {
      setUser(data[0]);
     })
  }, );

  useEffect (() => {
    scrollRef.current.scrollTo(0,0)
  }, [])

  return (
    <div className="flex bg-blue-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-intial">
        <Sidebar user={user1 && user}/>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
         <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)}/>
         <Link to="/">
           {/* <img src={vee1} alt="logo" className='w-28'/> */}
         </Link>
         <Link to={`user-profile/${user1?._id}`}>
           {/* <img src={vee1} alt="logo" className='w-12 h-13 rounded'/> */}
           <img src={user1?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
         </Link>
       </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)}/>
            </div>
            <Sidebar user={user1 && user} closeToggle={setToggleSidebar}/>
          </div>
        )}
        
      </div>
      
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
