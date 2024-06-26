import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { urlFor, client } from '../client'
import vee1 from '../assets/user.jpeg';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { FaHeart } from "react-icons/fa6";
import { fetchUser } from './../utils/fetchUser';
import { CiHeart } from 'react-icons/ci';


const Pin = ({ pin }) => {
  const [isActive, setIsActive] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  const handleClick = () => {
    setIsActive(!isActive);
    setLikeCount(likeCount + 1);
  };

  useEffect(() => {
    const storedCount = localStorage.getItem('likeCount');
    if (storedCount) {
      setLikeCount(parseInt(storedCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likeCount', likeCount);
  }, [likeCount]);


  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const { postedBy, image, _id, destination } = pin;

  const user = fetchUser();

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const navigate = useNavigate();

  const savePost = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePost = (id) => {
    client
      .delete(id)
      .then(() => {
          window.location.reload();
      });
  };

  return (
    <div className="m-2">
      <div 
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-[30px] w-full " src={(urlFor(image).width(250).url())} alt="user-pin" />
        
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{ height: '100%' }}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a href={`${image?.asset?.url}?dl=`} download onClick={(e) => { e.stopPropagation(); }} className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-mdoutline-none"><MdDownloadForOffline /> </a>
              </div>

              {alreadySaved?.length !== 0 ? (<button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">{pin?.save?.length}  Saved </button>
              ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); savePost(_id); }} 
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>

            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {
                postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(_id);
                  }}
                  className="bg-blue-100 p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
                )
              }
            </div>

          </div>
        )}
      </div>

      <div className="flex justify-between -[5px]">
        <Link
          to={`/user-profile/${postedBy?._id}`}
          className="flex gap-2 mt-2 ml-[5px] items-center"
        >
          <img
            className="w-[3rem] h-[3rem] rounded-full object-cover"
            src={postedBy?.image || vee1} // Use vee1 as a default if postedBy?.image is undefined
            alt="user-profile"
          />

          <p className="font-semibold capitalize">{postedBy?.userName || 'Guest'}</p>
        </Link>

        <div className="mt-[12px] mr-[20px] heart" onClick={handleClick}>
          {isActive ? (
            <FaHeart className='w-[1.9rem] h-[1.9rem] heart' style={{ color: 'red' }} />
          ) : (
            <CiHeart className='w-[2.7rem] h-[2.7rem]' />
          )}
          {likeCount > 0 && <p className="like-count mr-[5px]">Likes {likeCount}</p>}
        </div>
        
      </div>


    </div>

  )
}

export default Pin