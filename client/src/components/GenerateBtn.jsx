import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {

  const { user, setshowLogin } = React.useContext(AppContext);
    const navigate = useNavigate();
    const onClickHandler = () => {
        if(user) {
            navigate('/result');
        }
        else {setshowLogin(true)}
    }
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:1}}
    viewport={{once:true}}
    className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 text-neutral-800 py-6 md:py-16'>
            See the magic happen!
        </h1>
        <button onClick={onClickHandler} className='inline-flex items-center gap-2 bg-black text-white py-3 px-12 rounded-full m-auto hover:scale-105 transition-all duration-700'>
            Generate Images
            <img src={assets.star_group} alt="" className='h-6' />
        </button>
    </motion.div>
  )
}

export default GenerateBtn