// import { useState } from 'react'
import './App.css'
import Countdown from './components/Countdown'
// import Header from './components/Header'
import Hero from './components/Hero'
import HomePage from './pages/HomePage'
import Test from './components/Test'
import ItemDetailPage from './components/ItemDetailPage'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import { BrowserRouter, Router } from 'react-router-dom'
import AllRoutes from './components/AllRoutes'
// import Login from './components/Login'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <Test/> */}
      {/* <Countdown/> */}
      {/* <ItemDetailPage/> */}
      {/* <HomePage/> */}
      {/* <Dashboard/> */}
      
      <BrowserRouter>
        <AllRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App
