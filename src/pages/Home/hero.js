import React from 'react'
import HeroImg from "../../assests/hero.svg"
export default function Hero() {
  return (
    <div className='flex w-full pt-20 '>
        <div className='w-1/2 flex flex-col'>
        <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-4xl xl:text-[54px] xl:leading-[74px] mb-1 md:mb-4 xl:mb-[18px]'>Collecting unique  architectural designs</h1>
       <p className='text-b3 mb-4 xl:mb-8 xl:text-xl xl:leading-[23px]'>Browse and build your collection of the world's most cutting-edge architectural designs</p> 
        
        <button className='btn-color w-1/3 px-4 py-2 text-sm text-black font-medium rounded-sm'>
            Discover Colleections
        </button>
        
        </div>

        <div className='w-1/2'>
            <div className="flex justify-end">
                <img src={HeroImg} alt="" />
            </div>  
       </div>

    </div>
  )
}
