import React from 'react'
import { topNftCreators } from '../../utils/data/top-nft-creators.data'

const TopNftCreator = () => {
    return (
        <section className='layout-container mt-10 lg:mt-[71px] pt-6'>
            <h1 className="section-heading text-xl">Top NFT creator</h1>
            <div className="mt-5 lg:mt-[33px] space-y-10 md:space-y-0 md:grid grid-cols-2 gap-10 lg:gap-x-6 lg:gap-y-8 lg:grid-cols-4">
                {
                    topNftCreators.map((item, index) => (
                        <div key={index} className="bg-[#282828] rounded-lg pb-6">
                            <img src={item.background} className="w-full" alt="" />
                            <div className="flex flex-col items-center -mt-10">
                                <img src={item.avatar} alt="" />
                                <h1 className='text-white mt-2 mb-1 font-medium text-xl leading-[23px] capitalize'>@ {item.name}</h1>
                                <p className="text-lightdark leading-[23px]">{item.earnings}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default TopNftCreator