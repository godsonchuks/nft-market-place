import React from 'react'
import StakeTable from './stake-table'
import "./stake.css"
import {FiSearch} from "react-icons/fi"
import {Link} from "react-router-dom"

export default function Staking() {
  return (
    <div className='pt-28'>
        <div className='stake-bg  flex py-8 px-4 '>
            <div className='flex items-center justify-between w-full'>
             <main className='space-y-2'>
                <h5 className='px-4 font-semibold text-4xl'>Community Pool</h5>
                <p className='text-md px-4'>Just stake some tokens to earn. <br></br>
                    High APR, low risk.
                </p>
             </main>
             <main className='px-10'>
             <Link to="/pool" ><button className='btn-color text-black text-sm py-2 px-4 font-semibold rounded-sm'>Create pool</button></Link>
             </main>
           </div>
        </div>

        <div className='px-4 pt-16'>
            <main className='flex space-x-10 '>
                <div className='flex border border-slate-800 w-1/4 rounded-lg items-center h-10'>
                 <input 
                 className='w-11/12 bg-black outline-none px-4'
                  placeholder='Search Pools'
                 />
                 <FiSearch />
                </div>
                <select className="bg-black  px-4 outline-none border border-slate-800 w-1/6  rounded-lg items-center h-10">
                   <option>HOT</option>
                   <option>HOT</option>
                </select>
                
              
            </main>

            <StakeTable />

        </div>

     </div>
  )
}
