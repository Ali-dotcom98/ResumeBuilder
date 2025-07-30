import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPages from './Pages/ResumeUpdate/LandingPages'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import Dashboard from './Pages/Home/Dashboard'
import EditResume from './Pages/ResumeUpdate/EditResume'
import UserProvider from './Components/context/userContext'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
              <Route path='/' element={<LandingPages/>} />
              <Route path='/Login' element={<Login/>} />
              <Route path='/Signup' element={<SignUp/>}/>
              <Route path='/Dashboard' element={<Dashboard/>}/>
              <Route path='/resume/:resumeId' element={<EditResume/>}/>
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px",
          }
        }}
        >

      </Toaster>
    </UserProvider>
  )
}

export default App