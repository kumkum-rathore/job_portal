import React from 'react'
import ClientReviews from './ClientReviews'
import BrowseJobsBanner from './BrowseJobsBanner'
import Navbar from '../components/Navbar'
import HowItWorks from './HowItWorks'
import Footer from './Footer'
const About = () => {
  return (
    <div>
      <Navbar/>
     
      <HowItWorks/>
      <ClientReviews/>
      <BrowseJobsBanner/>
      <Footer/>


    </div>
  )
}

export default About
