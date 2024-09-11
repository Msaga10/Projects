import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function HomePage() {
  return (
    // console.log(import.meta.env.VITE_APPWRITE_URL),
    
    <div className='flex flex-col h-screen'>
        {/* <Header/> */}
        <Hero/>
        {/* <Footer/> */}

    
    </div>
  )
}

export default HomePage
