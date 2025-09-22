import React, { use, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import { UserContext } from '../../Components/context/userContext'
import axiosInstance from '../../Utils/axiosinstance'
import {API_PATHS} from "../../Utils/ApiPath"
import { Eye, EyeOff } from 'lucide-react'
import CustomDiv from '../../Components/CustomDiv/CustomDiv'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState('')
    const [error, seterror] = useState("")
    const {updateUser} =useContext(UserContext)

    const navigate = useNavigate();

    

    const handleNavigation = (nav)=>{
        
    if(nav == "Login")
    {
        navigate("/Login")
    }
    navigate("/SignUp")
    }

  const handleForm =async (e)=>{
     e.preventDefault();
    if(!email)
        return seterror("Email required")
    
    if(!password)
        return seterror("Password Required")

    seterror("")
    try {
        
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN , {
            email,
            password
        })
        if(!response.data)
        {
            return navigate("/Login")
        }
        const {user , token} = response.data
        updateUser(user, token);
        navigate("/Dashboard")
        
    } catch (error) {
        if(error.response && error.response.data.Message)
        {
            seterror(error.response.data.Message);
        }
        else if(error.request){
            seterror("Server is Not Running");
        }
        else{
            seterror("Something Went wrong")
        }
    }
    
  }

  useEffect(() => {
    const resetError = setTimeout(() => {
        seterror("")
    }, 3000);
  
    return ()=> clearInterval(resetError)
  }, [error])
  

  return (
    <>
     <div className='font-urbanist relative flex flex-row font-poppins h-screen overflow-hidden'>
        <div className='w-[60%] flex flex-col  h-screen py-10 pl-16 '>
          <h1 className='font-semibold text-2xl'>ResumeForge</h1>
          <div className='flex flex-col justify-center w-[70%]   h-full'>
            <div className='flex flex-col gap-5'>
              <div className='space-y-1'>
                <h1 className='font-semibold text-2xl'>Welcome Back</h1>
                <p className='text-xs font-semibold text-black'>Please enter your details to log in</p>
              </div>
                <form onSubmit={handleForm}>
                    
                
                    <Input 
                        value = {email}
                        onchange ={({target})=> setemail(target.value)}
                        label = "Email Address"
                        placeholder = "Ali-dotcom98.@gmail.com"
                        type= "text"
                    />
                    <Input 
                        value = {password}
                        onchange ={({target})=> setpassword(target.value)}
                        label = "Password "
                        placeholder = "Your password"
                        type= "password"
                    />
                    <button type='submit' className='btn-primary'>Login</button>
                    <p className='text-[13px] text-slate-800 my-3'>
                        Dont have an Account? {""}
                        <button className='font-medium text-primary underline cursor-pointer' onClick={()=>handleNavigation("SignUp")}>
                            Signup
                        </button>
                        <div className='  min-h-5 mt-2'>
                            {error && <p className='text-red-500 text-xs'>{error}</p>}
                    </div>
                    </p>

                </form>
              
            </div>
          </div>
        </div>

         <div className="relative flex h-[120vh] w-[40%] -translate-y-10 translate-x-10 rotate-12 items-center justify-center overflow-hidden bg-purple-600">
          <CustomDiv />
        </div>
        <div className="absolute -top-96 right-32 z-30 size-96 -translate-y-16 -rotate-12 scale-150 rounded-3xl bg-purple-400"></div>
        <div className="absolute -bottom-96 right-32 z-30 size-96 -translate-x-48 translate-y-8 -rotate-12 scale-150 rounded-3xl bg-purple-400"></div>
      
      </div>
    </>
   
  )
}

export default Login