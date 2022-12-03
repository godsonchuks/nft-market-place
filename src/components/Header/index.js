import React from 'react'
import ConnectAccount from '../ConnectAccout'
import { Link } from "react-router-dom"

// images
import logo from "../../assests/logo.png"

export default function Header() {
  return (
    <div className=' w-screen bg-black'>
      <header className="fixed w-full bg-black pb-10 pt-4 z-10">
        <div className="layout-container flex items-center justify-between ">
          {/* <h5 className='w-1/4'>Vutrivius</h5> */}
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <nav className='flex space-x-8 w-3/4 justify-end items-center px-14'>
            <main className='flex space-x-8 text-sm'>
              <Link to="/"><h5>Explore</h5></Link>
              <Link to="/stake"><h5>Stake</h5></Link>
              <Link to="list"><h5>Create</h5></Link>
              <Link to="bridge"><h5>Bridge</h5></Link>
            </main>
            <ConnectAccount />
          </nav>
        </div>
      </header>
    </div>
  )
}
