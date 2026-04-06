import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from './HeroSection'
import Employers from './Employers'
import Footer from './Footer'


const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Navbar/>
      <HeroSection user={user}/>
      <Employers/>
      <Footer/>
    </div>
  )
}

export default Home
