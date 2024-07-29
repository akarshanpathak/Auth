import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Chat from './components/Chat'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import NotFound from './components/NotFound'
import About from './pages/About'
function App() {
  const {selectedUser}=useContext(UserContext)
  return (
    <div className='bg-slate-900'>
      <BrowserRouter>
        <Header/>
        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/about' element={<About/>}/>
          {
            selectedUser?<Route path='/chat' element={<Chat  selectedUser={selectedUser}/>}/>:<Route path='/chat' element={<NotFound  />}/>
          }
          
        </Routes>
        <Footer/>  
      </BrowserRouter>
    </div>
  )
}

export default App
