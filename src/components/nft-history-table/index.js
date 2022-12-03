import React from 'react'

const NftHistoryTable = () => {

  const tableHeading = ['Referral', 'price', 'from', 'to', 'date']
  return (
    <div>
      {/* table heading */}
      <div className="grid grid-cols-5 border-b border-[#2A2B31] pb-5">
        {
          tableHeading.map((item, index) => (
            <div key={index} className="uppercase text-sm leading-[18px] text-white font-ubuntu font-medium">{item}</div>
          ))
        }
      </div>
    </div>
  )
}

export default NftHistoryTable