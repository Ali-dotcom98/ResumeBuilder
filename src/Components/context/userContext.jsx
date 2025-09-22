import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {API_PATHS} from "../../Utils/ApiPath"
import axiosInstance from "../../Utils/axiosinstance";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [User, setUser] = useState(null)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            
            try {
                
                const result = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(result.data.user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);
    
    


    const updateUser = (user, token) => {
        setUser(user);
        localStorage.setItem("token", token);
        setLoading(false);
    }

    const clearUser = () => {
        setUser(null)
        localStorage.removeItem("token");
    }
    return (
        <UserContext.Provider value={{ updateUser, clearUser , User , loading  }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider