import React from 'react'
import Header from '../components/Header'
import Footer from './footer'
import toast, { Toaster } from 'react-hot-toast';

export default function Layout({children}) {
  return (
    <div className="layout bg-black h-screen text-white px-8 overflow-x-hidden">
      <Header />
    <div className="page ">
      {children}

      < Toaster  />
    </div>
    <div className='pt-32'>
      <Footer />
    </div>
</div>
  )
}
