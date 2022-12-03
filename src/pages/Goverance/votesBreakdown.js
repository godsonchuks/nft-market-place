import React from "react";

import { votesBreakdownData } from "../../utils/data/votesBreakdownData";

const VotesBreakdown = () => {
  return (
    <div className="bg-[#2D2D2D] rounded-[8px] py-8 px-[22px] mt-4 w-full">
      <h2 className="capitalize text-[#F5F5F5] text-base leading-[18px] font-medium mb-2">
        Vote breakdown
      </h2>
      {votesBreakdownData.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between items-center w-full p-[0]">
            <p className="text-[#D9D9D9] text-sm leading-7">{item.name}</p>
            <p className="text-[#D9D9D9] text-sm leading-6">
              {item.amount} ONE voting ({item.percentage}%)
            </p>
          </div>
          <div className="py-[8px]">
          <progress id="file" value={item.percentage} max="100" className="w-full !rounded-[10px]"/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VotesBreakdown;
