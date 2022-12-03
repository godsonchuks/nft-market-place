import React,{useState} from 'react'
import NFtBOX from "../../assests/nftBox.png"
import NftHistoryTable from '../../components/nft-history-table'
export default function NftHistory() {
    const [nftHistory,setHistory]=useState([])
  return (
    <div>
         <h5 className='text-xl font-semibold'>NFT History</h5>
        <div className='stake-bg h-64 mt-8 mb-8'>
                {
                    nftHistory.length===0&&
                    <div className='flex flex-col items-center justify-center h-full'>
                        <img src={NFtBOX} className=""/>
                        <h5 className='text-sm'>No information here</h5>
                   </div>

           }
        </div>

        {  nftHistory.length === 0 && <NftHistoryTable />
            //  <div className='flex space-x-40 stake-bg py-2 px-8 items-center '>
            //  <h5 className='text-sm'>REFERRAL</h5>
            //  <h5 className='text-sm'>PRICE</h5>
            //  <h5 className='text-sm'>FROM</h5>
            //  <h5 className='text-sm'>TO</h5>
            //  <h5 className='text-sm'>DATE</h5>
           
        //  </div> 
        }
        

       
    </div>
  )
}
