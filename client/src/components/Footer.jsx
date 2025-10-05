import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex gap-4 items-center justify-between py-3 mt-20'>
        <img width={150} src={assets.logo} alt="" />
        <p className='text-sm text-gray-500 flex-1 border-l border-gray-400 pl-4 max-sm:hidden'>&copy; 2024 Imagify | All rights reserved.</p>
        <div className='flex gap-2.5'>
            <img width={35} src={assets.facebook_icon} alt="" />
            <img width={35} src={assets.twitter_icon} alt="" />
            <img width={35} src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer