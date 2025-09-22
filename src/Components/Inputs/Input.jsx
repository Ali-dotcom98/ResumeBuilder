import {FaRegEye , FaRegEyeSlash} from "react-icons/fa"
import React, { useState } from 'react'

const Input = ({value, onchange , label, placeholder, type}) => {
    const [showPassword, setshowPassword] = useState(false)

    const ToggleShowPassword = ()=>{
        setshowPassword(!showPassword);
    }
  return (
    <div className='flex flex-col my-2 space-y-1.5 relative'>
        <label htmlFor="">{label}</label>
        <input type={ type =="password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className=' w-full p-3 border bg-slate-50  outline-none rounded-md'
            value={value}
            onChange={(e)=>onchange(e)}
        />
        {
            type == "password" && (
                <>
                    {
                        showPassword ? (
                            <div className='absolute right-0 top-1/2 -translate-x-4'  onClick={ToggleShowPassword}>
                                <FaRegEye size={22} className=''/>
                            </div>
                        )
                        :
                        (
                            <FaRegEyeSlash size={22} className='absolute right-0 top-1/2 -translate-x-4' onClick={ToggleShowPassword} />
                        )

                    }

                </>
            )
        }
    </div>
  )
}

export default Input