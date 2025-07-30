import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const ProfileCard = () => {
    const {User , cleatUser}= useContext(UserContext)
    const Navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.clear();
        Navigate("/")
    }

  return User&&(
    <div className='flex items-center'>
        <img src={User.profileImageUrl} className='size-11 bg-gray-300 rounded-full mr-3' alt="" />
        <div>
            <div className='text-[15px] font-bold leading-3'>
                {User.name || ""}
            </div>
            <button className='text-purple-500 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileCard