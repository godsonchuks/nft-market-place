import React from 'react'

// images
import clock from '../../assests/goverance/clock.svg'
import arrow from '../../assests/goverance/arrow-down.svg'

const Hero = ({className, onClick}) => {
    return (
        <div className={`w-full h-[85vh] flex justify-center items-center ${className}` }>
            <div className='xl:w-[70%] md:w-[80%] w-full'>
                <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-[40px] lg:leading-[46px] mb-[20px] md:mb-[32px]'>Vote</h1>
                <div className='bg-[#2D2D2D] rounded-[8px] py-8 px-[22px]'>
                    <p className='text-[#95979F] text-xs mb-5'><span className='uppercase'>created Sep 30 16:00 utc</span> | Pool#1002</p>
                    <div>
                        <div className='flex justify-between items-center flex-wrap'>
                            <h2 className='capitalize text-[#F5F5F5] text-base leading-[18px] font-medium mb-2'>select an NFT to buy</h2>
                            <div className='flex justify-end items-center'>
                                <img src={clock} alt='clock' />
                                <p className='text-white text-xs ml-[9px]'>1day 20hours remaining</p>
                            </div>
                        </div>
                        <p className='text-[#D9D9D9] text-sm leading-7 mb-4'>You are about to send 1 transaction(s) to the blockchain, Sign a message in your wallet to mint and list this item</p>
                        <p className='text-[#D9D9D9] text-sm leading-6'>LEADING OPTION: <span className='text-[#66A8FF] uppercase'> Wiz buildings </span> with 23,243 ONE Supporting</p>
                        <button className='w-[154.67px] h-[40px] text-[#F5F5F5] bg-[#202730] border border-[#7491BB] rounded-[20px] flex justify-center items-center mt-7' onClick={onClick}>
                            View Details<img src={arrow} alt="arrow" className='pl-2' />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Hero