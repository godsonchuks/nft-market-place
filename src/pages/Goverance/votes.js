import React, { useState } from "react";
import Hero from "./hero";
import VotesBreakdown from "./votesBreakdown";
import NftHistory from "./nftHistory";
import NftVote from "./nftVote";
import "./goverance.css"

// images
import clock from "../../assests/goverance/clock.svg";

const Votes = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="layout-container pt-[80px] pb-[100px]">
      <Hero
        onClick={() => setShowDetails(true)}
        className={showDetails ? "hidden" : "flex"}
      />
      <div className={` ${showDetails ? "block" : "hidden"}`}>
        <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-5xl xl:text-[64px] xl:leading-[74px] mb-1 md:mb-4 xl:mb-[18px]">
          Vote
        </h1>
        <div className="md:grid grid-cols-3 md:items-center xl:items-start gap-x-10 lg:gap-x-10">
          <div className="col-span-2">
            <div className="w-full">
              <div className="bg-[#2D2D2D] rounded-[8px] py-8 px-[22px]">
                <p className="text-[#777E90] text-xs mb-5">
                  <span className="uppercase">created Sep 30 16:00 utc</span> |
                  Pool#1002
                </p>
                <div>
                  <div className="flex justify-between items-center flex-wrap">
                    <h2 className="capitalize text-[#F5F5F5] text-base leading-[18px] font-medium mb-2">
                      select an NFT to buy
                    </h2>
                    <div className="flex justify-end items-center">
                      <img src={clock} alt="clock" />
                      <p className="text-white text-xs ml-[9px]">
                        1day 20hours remaining
                      </p>
                    </div>
                  </div>
                  <p className="text-[#D9D9D9] text-sm leading-7 mb-4">
                    You are about to send 1 transaction(s) to the blockchain,
                    Sign a message in your wallet to mint and list this item
                  </p>
                  <p className="text-[#D9D9D9] text-sm leading-6">
                    LEADING OPTION:{" "}
                    <span className="text-[#66A8FF] uppercase">
                      {" "}
                      Wiz buildings{" "}
                    </span>{" "}
                    with 23,243 ONE Supporting
                  </p>
                  <div className="mt-7">
                    <h3 className="font-bold text-[#D9D9D9] text-sm uppercase">
                      Voting stats
                    </h3>
                    <div className="mt-[10px] flex justify-between items-center">
                      <p className="capitalize text-[#E8EDF0] text-xs">
                        Total voting power
                      </p>
                      <p className="text-[#E8EDF0] text-xs">50,976 ONE</p>
                    </div>
                    <div className="mt-[10px] flex justify-between items-center">
                      <p className="capitalize text-[#E8EDF0] text-xs">
                        total votes
                      </p>
                      <p className="text-[#E8EDF0] text-xs">10</p>
                    </div>
                  </div>
                </div>
              </div>
              <VotesBreakdown />
              <NftHistory />
            </div>
          </div>
          <div>
            <NftVote />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
