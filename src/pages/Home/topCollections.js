import React from 'react'
import { topCollectionData } from '../../utils/data/top-collection'
import HarmonySymbolIcon from "../../assests/polygon.png"
export default function TopCollections() {
  return (
    <section className='layout-container mt-10 md:mt-[62px]'>
           <h5 className='text-2xl  font-semibold text-slate-300'>Top Collections</h5>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-x-6">
                {
                    topCollectionData.map((item, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr] items-baseline border-b border-[#3D3D3E] pb-[9px] pl-[23px] pr-3">
                            <div className='flex items-center space-x-[27px]'>
                                <p className="text-white md:text-xl md:leading-[23px]">{index + 1}</p>
                                <div className='flex space-x-4 items-center'>
                                    {/* <div className="h-10 w-10 bg-[#D9D9D9] rounded-full" /> */}
                                    <div>
                                        <h2 className="font-medium text-sm capitalize text-white mb-[9px]">{item.name}</h2>
                                        <div className="flex space-x-3 items-center">
                                            <p className="text-xs leading-[14px] capitalize text-[#95979F]">floor price</p>
                                            <div className="flex items-center space-x-[6px]">
                                                <img src={HarmonySymbolIcon} className="h-3 w-3" alt="" />
                                                <p className="text-sm leading-4 text-[#95979F]">{item.floorPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <div className=''>
                                    <p className='text-[#95979F] text-sm leading-4'>+{item.percent}</p>
                                    <div className="flex items-center space-x-2">
                                        <img src={HarmonySymbolIcon} className="h-3 w-3" alt="" />
                                        <p className="text-sm leading-4 text-white">{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
  )
}
