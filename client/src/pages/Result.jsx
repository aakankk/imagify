import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const {generateImages} = useContext(AppContext) 

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);

    if(input){
      const img = await generateImages(input);
      if(img){
        setIsImageLoaded(true)
        setImage(img)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] items-center justify-center'
      initial={{opacity:0.2, y:100}}
      whileInView={{opacity:1, y:0}}
      transition={{duration:1}}
      viewport={{once:true}}>
    <div>
      <div className='relative'>
        <img className='max-w-sm rounded' src={image} alt="" />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
      </div>
      <p className={!loading ? 'hidden' : ''}>Loading.....</p>
    </div>
  {!isImageLoaded && 
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 rounded-full mt-10'> 
      <input onChange={(e) => setInput(e.target.value)} value={input}
       type="text" className='flex-1 bg-transparent outline-none ml-8 max:sm-w-20 placeholder-color' placeholder='Describe what you want to generate' />
      <button type="submit" className='bg-zinc-900 px-10 py-3 sm:px-16 rounded-full'>Generate</button>
    </div>
 }
 {isImageLoaded &&
    <div className='flex flex-wrap justify-center gap-2 mt-10 text-sm p-0.5 text-white rounded-full'>
      <p onClick={() => {setIsImageLoaded(false)}} className='bg-transparent border border-zinc-600 text-black px-8 py-3 rounded-full cursor-pointer'> Generate Another</p>
      <a href={image} download className='bg-zinc-900 cursor-pointer px-10 py-3 rounded-full'> Download </a>
    </div>
  }
  </motion.form>
  )
}

export default Result