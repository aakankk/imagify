import React from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

    const [state, setState] = React.useState('Login');
    const {setshowLogin, backendURL, setToken, setUser} = React.useContext(AppContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            if(state === 'Login'){
                const {data} = await axios.post(backendURL + '/api/user/login', {email, password});
                if(data.success){
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setshowLogin(false);
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const {data} = await axios.post(backendURL + '/api/user/register', {name, email, password})
                if(data.success){
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setshowLogin(false);
                }
                else{
                    toast.error(data.message);
                }
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        }
        },[])
        

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur flex items-center justify-center bg-black/30'>
        <motion.form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'
            initial={{opacity:0.2, y:50}}
            whileInView={{opacity:1, y:0}}
            transition={{duration:0.3}}
            viewport={{once:true}}>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'> {state} </h1>
            <p className='text-sm '>Welcome Back! Please sign in to continue</p>
            
            {
            state !== 'Login' && <div className='border px-6 py-2 flex items-center rounded-full mt-5 gap-2 '>
                <img src={assets.profile_icon} alt="" className='h-7'/>
                <input type="text" onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm' placeholder='Full Name' required/>
            </div>
            }

            <div className='border px-6 py-2 flex items-center rounded-full mt-4 gap-2 '>
                <img src={assets.email_icon} alt="" className='w-4'/>
                <input type="email" onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm gap-4' placeholder='Email Id' required/>
            </div>

            <div className='border px-6 py-2 flex items-center rounded-full mt-4 gap-2 '>
                <img src={assets.lock_icon} alt="" className='h-4'/>
                <input type="password" onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm gap-4' placeholder='Password' required/>
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password ?</p>
            <button className='w-full bg-blue-600 text-white py-2 rounded-full'>{state ===  'Login' ? 'login': 'create account'}</button>
            {
            state === 'Login' ? 
            <p className='mt-5 text-center'>Don't have an account?<span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign up</span></p>
            :
            <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 cursor-pointer'onClick={()=>setState('Login')}>Login</span></p>
            }
            <img  onClick={()=> setshowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
        </motion.form>
    </div>
  )
}

export default Login