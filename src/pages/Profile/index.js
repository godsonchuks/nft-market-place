import React,{useState} from 'react'
import { useLocation,useParams} from "react-router-dom";
import {MdOutlineModeEditOutline} from "react-icons/md"
import "./profile.css"
import {Link,Outlet} from "react-router-dom"
export default function Profile() {
    const location =useLocation()
    const [locationState,setlocationState] = useState(location.state)
  
  return (
    <div className='pt-20'>
        <div className='btn-color h-24'>
        </div>
        <div className='px-10'>
         <div className='rounded-full -mt-5 h-14 w-14 bg-purple-600 flex flex-col items-center justify-center'>
            <MdOutlineModeEditOutline />
         </div>
         </div>

         <div className='flex w-full px-6 items-center justify-between'>
             <main className='flex flex-col space-y-2'>
                <h5 className='text-xl font-semibold'>Unnamed</h5>
                <h5 className='rounded-full px-2 py-1 text-xs  w-1/6 stake-bg '>{locationState?.account?.slice(0,9)+"..."}</h5>
                <p className='text-xs'>
                   I am a New Zealand artist based in Wanaka.
                <br></br>
                  I love to capture the essence of a place and evoke feelings of nostalgia, romanticism and idealism.
                </p>
             </main>
             <main className='flex space-x-4'>
                <button className='stake-bg h-8 w-8 rounded-sm'></button>
                <button className='stake-bg h-8 w-8 rounded-sm'></button>
                <button className='stake-bg h-8 w-8 rounded-sm'></button>
                <button className='stake-bg h-8 w-8 rounded-sm'></button>
             </main>
         </div>

         <div className='px-6 pt-10'>
            <main className='flex border-b space-x-10 items-center pb-2'>
            <Link to="created"><h5 className='flex space-x-2 items-center '><span>Created</span> <span className='rounded-full flex justify-center stake-bg w-4 h-4 text-xs'>{"0"}</span></h5></Link>
            <Link to="owned"><h5 className='flex space-x-2 items-center'><span>Owned</span> <span className='rounded-full stake-bg flex justify-center w-4 h-4 text-xs'>{"0"}</span></h5></Link>  
            <Link to="collections"> <h5 className='flex space-x-2 items-center'><span>Collections</span> <span className='rounded-full flex justify-center stake-bg w-4 h-4 text-xs'>{"0"}</span></h5></Link> 
            <Link to="transactions">  <h5 className='flex space-x-2 items-center'><span>Transactions</span> <span className='rounded-full flex  justify-center stake-bg w-4 h-4  text-xs'>{"0"}</span></h5></Link> 

            </main>
            <main className='pt-4'>
               <Outlet />
            </main>
         </div>
    </div>
  )
}
