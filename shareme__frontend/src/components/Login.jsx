import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    // Decode the credential to extract user information
    const decodedCredential = jwtDecode(credentialResponse.credential);
  
    // Extract required user information
    const { sub: googleId, name: username, picture: image } = decodedCredential;
  
    // Create the user document
    const userDocument = {
      _id: googleId,
      _type: 'user',
      username,
      image
    };
    console.log(userDocument)
  
    // Additional logic for user management (replace with your implementation)
    // Example: Store user document in localStorage
    localStorage.setItem('user', JSON.stringify(userDocument));
  
    // Example: Navigate to home page
    client.createIfNotExists(userDocument).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt='logo' width="130px" />
          </div>

          <div className="shadow-2xl">
          <GoogleLogin

            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with google
              </button>
            )}
            onSuccess={responseGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
            cookiePolicy="single_host_origin"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;