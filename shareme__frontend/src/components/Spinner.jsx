import React from 'react'
import spinner from '../assets/Spinner.svg';

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <img
        src={spinner} 
        alt='loader'
        width={130}
        height={50}
        className='m-5 rounded-full'
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  )
}

export default Spinner
