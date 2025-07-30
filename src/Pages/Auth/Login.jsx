import React, { use, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import { UserContext } from '../../Components/context/userContext'
import axiosInstance from '../../Utils/axiosinstance'
import {API_PATHS} from "../../Utils/ApiPath"

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
  return (
    <div className='w-[90vw] border md:[33vw ] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter your detail to log in</p>
        <form onSubmit={handleForm}>
            <div>
              {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
            </div>
           
            <Input 
                value = {email}
                onchange ={({target})=> setemail(target.value)}
                label = "Email Address"
                placeholder = "John@gmail.com"
                type= "text"
            />
             <Input 
                value = {password}
                onchange ={({target})=> setpassword(target.value)}
                label = "Password "
                placeholder = "lklkll"
                type= "password"
            />
            <button type='submit' className='btn-primary'>Login</button>
            <p className='text-[13px] text-slate-800 mt-3'>
                Dont have an Account? {""}
                <button className='font-medium text-primary underline cursor-pointer' onClick={()=>handleNavigation("SignUp")}>
                    Signup
                </button>
            </p>

        </form>
      
    </div>
  )
}

export default Login