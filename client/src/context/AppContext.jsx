import { createContext, useState, useEffect } from "react";
import {toast} from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setshowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credits, setCredits] = useState(false);
  
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try{
      const {data} = await axios.get(backendURL + '/api/user/credits', {headers: {token}})
      if(data.success){
        setCredits(data.credits);
        setUser(data.user);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const generateImages = async (prompt) => {
    try{
      const {data} = await axios.post(backendURL + '/api/image/generate-image', {prompt}, {headers: {token}});
      if(data.success){
        loadCreditsData();
        return data.resultImage;
      }
      else{
        toast.error(data.message);
        loadCreditsData();
        if(data.credits === 0){
          navigate('/buy');
        }
        return null;
      }
    }catch (error) {
      toast.error(error.message);
      return null;
    }
  }


  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  }
  useEffect(() => {
    if(token){
      loadCreditsData();
    }
  },[token])

  const value = { user, setUser, showLogin, setshowLogin, backendURL, token, setToken, credits, setCredits, loadCreditsData,
    logout, generateImages
   }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;