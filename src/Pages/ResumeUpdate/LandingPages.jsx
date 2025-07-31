import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const LandingPages = () => {
  const navigate = useNavigate();

  const handleNavigation = (nav)=>{
    console.log(nav);
    
    if(nav === "Login")
    {
      return navigate("/Login")
    }
    navigate("/SignUp")
    
  }
  return (
    <div className='flex font-urbanist items-center h-screen justify-center gap-10'>
      <h1>Resume Builder</h1>
      <div className='cursor-pointer' onClick={()=>handleNavigation("Login")}>
        Login
      </div>
      <div className='cursor-pointer' onClick={()=>handleNavigation("SignUp")}>
        Signup
      </div>
    </div>
  )
}

export default LandingPages