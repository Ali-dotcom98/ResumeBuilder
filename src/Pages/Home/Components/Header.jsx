import React, { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LuFile } from 'react-icons/lu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const size = 4;

  const handleNavigation = (nav)=>{
    console.log(nav);
    
    if(nav === "Login")
    {
      return navigate("/Login")
    }
    navigate("/SignUp")
    
  }

  const NavBar = [
    {name : "features"},
    {name : "templates"},
    {name : "pricing"},
    {name : "Login"},

  ]

  return (
    <header className="font-urbanist fixed top-0 w-full   backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex text-[21px] items-center space-x-2 text-gray-900">
            <span className="font-extrabold tracking-wider">
              ResumeForge
            </span>
          </div>

          
          <nav className="hidden md:flex items-center space-x-8">
            {
                 NavBar.map((item)=>{
                    return <button onClick={ item.name == "Login" ? ()=>handleNavigation("Login"):""} 
                    className='capitalize text-[15px] font-semibold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors duration-200 px-2 py-0.5 focus:outline-none   '>{item.name}</button>
                 })
            }
           
            <button onClick={()=>handleNavigation("SignUp")} className="btn-large">
              Get Started
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Features</a>
              <a href="#templates" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Templates</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Pricing</a>
              <button className="block px-3 py-2 text-gray-600  ">Login</button>
              <button onClick={()=>handleNavigation("SignUp")} className="w-full mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;