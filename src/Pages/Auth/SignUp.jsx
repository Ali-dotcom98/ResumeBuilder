import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import PhotoSelector from './components/PhotoSelector';
import { UserContext } from '../../Components/context/userContext';
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from "../../Utils/ApiPath";
import UploadImage from "./components/UploadImage";

const SignUp = () => {
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');
  const [fullname, setfullname] = useState('');
  const [profilePic, setprofilePic] = useState('');
  const [error, seterror] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // ✅ now using context

  const handleNavigation = () => {
    navigate("/Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullname) return seterror("Please Enter Full Name");
    if (!Password) return seterror("Please enter the password");
    
    seterror("");

    try {
      // 📸 Upload image (optional)
      const uploadImage = await UploadImage(profilePic);
      const profileImageUrl = uploadImage?.Image || "";

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullname,
        email,
        password: Password,
        profileImageUrl
      });

      const { user, token } = response.data;

  
      updateUser(user, token);
      navigate("/Dashboard");

    } catch (error) {
      if (error.response && error.response.data.Message) {
        seterror(error.response.data.Message);
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <h3>Create an Account</h3>
      <p>Join us</p>
      <form onSubmit={handleSubmit}>
        <div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        </div>
        
        <PhotoSelector image={profilePic} setimage={setprofilePic} />

        <Input 
          value={fullname}
          onchange={({ target }) => setfullname(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />
        <Input 
          value={email}
          onchange={({ target }) => setemail(target.value)}
          label="Email Address"
          placeholder="john@gmail.com"
          type="email"
        />
        <Input 
          value={Password}
          onchange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        <button type='submit' className='btn-primary'>Sign up</button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <button className='font-medium text-primary underline cursor-pointer' onClick={handleNavigation}>
            Login 
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
