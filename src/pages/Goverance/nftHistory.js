import React from "react";
import {walletAddressConvertion} from "../../helpers"
import { nftHistoryHeading, nftHistoryList } from "../../utils/data/nft-history.data";

const NftHistory = () => {
  return (
    <div className="text-white mt-[32px]">
      <h1 className="capitalize font-bold mb-3 md:mb-[15px] text-xl md:text-2xl md:leading-[41px] ">
        NFT History
      </h1>
      <div className="overflow-x-auto bg-[#2D2D2D] ">
        <div className="md:w-[1280px] lg:w-full rounded-[20px]">
          {/* table heading */}
          <div className="grid grid-cols-3 md:grid-cols-4 py-[19px] bg-[#29282E] pl-3 md:pl-6">
            {nftHistoryHeading.map((item, index) => (
              <div
                key={index}
                className={`uppercase text-sm leading-[18px] font-medium`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* table body */}
          <div className="h-[400px] overflow-y-scroll">
            {nftHistoryList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 md:grid-cols-4 pl-3 md:pl-6 py-3 items-center"
              >
                <div className="text-[15px] leading-5 capitalize flex justify-start items-center">
                  <img src={item.image} alt='' className="w-[50px]"/>
                  <p className="ml-[10px]">{walletAddressConvertion(item.address)}</p>
                </div>
                <div className="text-base leading-5 hidden md:block">
                  {item.option}
                </div>
                <div className="text-base leading-5">{item.vote}%</div>
                <div className="text-base leading-5"> {item.amount} ONE</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftHistory;
