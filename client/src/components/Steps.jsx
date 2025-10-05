import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-32'
    initial={{opacity:0.2, y:100}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:1}}
    viewport={{once:true}} >
        <h1 className='text-3xl sm:text-4xl'> How it works</h1>
        <p className='text-lg text-gray-600 mb-8'>Transform words into stunning images</p>
        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item, index) => (
                <div key={index} className='gap-4 p-5 px-8  border cursor-pointer hover:scale-[1.02] transiton-all duration-300 bg-white/20 p-6 shadow-md flex items-center'>
                    <img width="40"src={item.icon} alt="{item.title}"/>
                    <div className='text-xl font-medium'>{item.title}</div>
                    <p className='text-gray-500'>{item.description}</p>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Steps