import React,{useState} from 'react'
import { useLocation,useParams} from "react-router-dom";
import avater from "../../assests/male-avater.png"
import viewIcon from  "../../assests/view-icon.png"
import favorite from "../../assests/favorite.png"
import harmony from "../../assests/polygon.png"
import ellipse from "../../assests/Ellipse.png"
import metadata from "../../assests/metadata.png"
import ipfs from "../../assests/ipfs.png"
import NftHistory from './nft-history';
import marketPlaceAbi from "../../ContractABI/marketplaceAbi.json"
import { AccountState,PkState } from '../../recoilstate/globalState'
import { useRecoilValue } from 'recoil'
import erc721V3xAbi from "../../ContractABI/v3xcollectionAbi.json"
import Modal from '../../components/Modal';
import Checker from "../../assests/checker.png"
import toast, { Toaster } from 'react-hot-toast';
import {AiOutlineCloseCircle } from "react-icons/ai"
import Web3 from "web3";



export const marketplace_contract_Address="0x5E7019F60cEBD829C7612ABFcC1c717A21743818"
export const collection_contract_Address="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"

export default function Item() {

    
   const privateKey =useRecoilValue(PkState)
   const account=useRecoilValue(AccountState)
 
    const location =useLocation()
    const [locationState,setlocationState] = useState(location.state)
    const [trigger,setTrigger] =useState(false)
    const [purchase,setPurchased] =useState(false)
    const [token,setToken]=useState("")
    
    const web3 = new Web3(window.ethereum)
    
    

    const marketPlaceContract = new web3.eth.Contract(
      marketPlaceAbi,
      marketplace_contract_Address
     )
   
    

    const purchaseItem=async()=>{
      console.log(token)
      if (token ==="") return  console.log("empty")
      const feeOne =Number(locationState.item?.price)
       if(token=="one"){
          console.log("one")
          try{
       
       const tx = await marketPlaceContract.methods.purchaseItemWithONE(1).send({from:account})
            
           
          console.log(tx,"ttttttttt")
          setToken("")
          setPurchased(true)
           }catch(e){
            console.log(e)
            }   
     
       }else{
         console.log("v3t")
         
         try{
            const feeOne =Number(locationState.item?.price)*4
            const tx =await marketPlaceContract.methods.purchaseItemWithONE(1,feeOne ,"0x122Fd2332E02E80A7AA765A87e0ABBDb07F1f56F").send({from:account})
        
        
          console.log(tx,"ttttttttt")
          toast(`Transaction successful
          Transaction Hash: ${tx.transactionHash}
           `)
          setToken("")
           }catch(e){
            console.log(e)
            }   
     
       }
    }
  return (
   <>
    <div className='pt-24'>
        <div className='flex w-full'>
           <main className='w-1/4 flex justify-center'>
             <img src={locationState.item?.imgUrl} className="h-64 w-3/4" />
           </main>
           <main className='w-3/4 flex flex-col'>
             <div>
              <h5 className='text-xs text-slate-300'>{locationState.item?.title}</h5>
              <h5 className='text-xl font-semibold'>{`${locationState.item?.title} #1`}</h5>
             </div>
             <div className='pt-4 '>
                <h5 className='text-xs text-slate-400'>Created by</h5>
                <main className='flex items-center space-x-6 pt-2'>
                <h5 className='flex items-center space-x-2'> <img src={avater} className="w-4 h-4" /> <span className='text-xs font-light text-slate-400'>{locationState.item?.owner.slice(0,11)+"..."}</span></h5>
                <h5 className='flex items-center space-x-2'> <img src={viewIcon} className="w-4 h-4"/> <span className='text-xs font-light text-slate-400'>{"31 Views"}</span></h5>
                <h5 className='flex items-center space-x-2'> <img src={favorite} className="w-4 h-4"/> <span className='text-xs font-light text-slate-400'>1 Favorite</span></h5>
                </main>
             </div>
             <div className='flex flex-col pt-4'>
                <h5 className='text-xs text-slate-400'>Current price</h5>
                <main className='flex items-center space-x-2'>
                    
                     <h5 className='text-lg flex space-x-1 items-center font-semibold'><img src={harmony} className="w-4 h-4"/> <span>{locationState.item?.price}</span></h5>
                     <h5 className='text-xs text-slate-400'>${locationState.item?.price *0.0023}</h5>
                </main>

             </div>
             <div className='flex space-x-4 pt-8'>
                <button className='btn-color text-black text-xs w-24 py-1'
                 onClick={()=>setTrigger(true)}
                >Buy Now</button>
                <button className='flex items-center w-32 py-1 rounded-full border border-slate-800 justify-center text-xs space-x-1'><img src={ellipse} className="w-2 w-2"/> <span>View AR</span></button>

             </div>
           </main>
        </div>
        

        <div className='flex space-x-4 w-full pt-12 px-8'>
            <div className='w-1/2'>
                 <h5 className='border-b text-xl'>Description</h5>
                 <p className='text-slate-400 text-sm pt-4'>{locationState.item?.description}</p>

                 <main className='pt-4'>
                    <h5 className='text-slate-400 text-xs'>Contract Address: {"0x53634...536"}</h5>
                    <h5 className='text-slate-400 text-xs'>Token standard: ERC721</h5>
                    <h5 className='text-slate-400 text-xs'>Blockchain: Harmony </h5>
                 </main>

                 <main className='py-4'>
                    <h5 className='border-b text-xl'>Details</h5>
                    <main className='pt-4'>
                    <h5 className='flex space-x-2 text-slate-400 items-center text-xs'><img src={metadata} className="w-2 h-2"/> <span>View on Explorer</span></h5>
                    <h5 className='flex space-x-2 text-slate-400 items-center text-xs'><img src={metadata} className="w-2 h-2"/><span>View metadata</span></h5>
                    <h5 className='flex space-x-2  text-slate-400 items-center text-xs'><img src={ipfs } className="w-2 h-2"/><span>View on IPFS</span></h5>
                    </main>
                 </main>
            </div>
            <div className='w-1/2 px-8 '>
              <h5 className='text-sm text-slate-400'>Tags</h5>
              <main className='flex space-x-4 pt-2'>
                <button className='text-xs border border-slate-800 py-1 px-2 text-slate-400 rounded-md'>Architecture</button>
                <button className='text-xs border border-slate-800 py-1 px-2 text-slate-400 rounded-md'>Skyscrapper</button>
                <button className='text-xs border border-slate-800 py-1 px-2 text-slate-400 rounded-md'>Buildings</button>

              </main>
            </div>
        </div>
        <div className='px-8'>
           <NftHistory />
        </div>
         
    </div>

    <Modal trigger={trigger} cname="h-56 w-1/3 shadow rounded-lg py-4 px-8">
        <main className='flex justify-end'>
           <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
         </main>
         {purchase===false&&
          <>
         <div className='flex flex-col pt-4'>
            <main className="flex text-slate-400 text-xs justify-between w-full items-center ">
               <h5>Item</h5>
               <h5>Total</h5>
            </main>
            <main className='stake-bg px-4 py-4 flex justify-between w-full items-center mt-2' >
               <div className='flex items-center space-x-2'>
                  <img src={locationState.item?.imgUrl} className="w-12 h-12 rounded-md"/>
                  <h5 className='flex flex-col text-xs'>
                     <span className='text-slate-400'>{locationState.item?.title}</span>
                     <span className='font-semibold'>{`${locationState.item?.title} #1`}</span>
                     <span className='text-slate-400'>Royalty Fee :{"0.1 MATIC"}</span>
                  </h5>
               </div>

               <div>
                 <h5 className='flex items-center space-x-1 text-xs'><img src={harmony } className="w-4  h-4"/> <span>{locationState.item?.price}</span></h5> 
                 <h5 className='text-xs text-slate-400'>{locationState.item?.price *4 } V3T</h5>
               </div>
              
            </main>
  
           </div>

           <main className='w-full pt-4 '>
             <button className='btn-color rounded-md w-full text-black py-1 flex justify-center space-x-4 items-center '
               onClick={purchaseItem}
             >
               <span>Complete purchase</span>
               <select name="cars" id="cars" className='text-xs text-slate-600 btn-color outline-none'
                 onChange={(e)=>setToken(e.target.value)}
               >
                  <option value="one" className='stake-bg outline-none'>MATIC</option>
                  <option value="v3t" className='stake-bg outline-none'>V3T</option>
               </select>  
            </button>
               
           </main>
           </>
         }

         {purchase===true&&
            <div className='flex flex-col items-center'>
               <h5 className='stake-bg rounded-full w-12 h-12 flex justify-center items-center'><img src={Checker } className="w-10 h-10"/></h5>
                <h5>Purchase Successful</h5>
                <main className='flex flex-col pt-4 space-y-2 w-full px-6'>
                   <button className="btn-color w-full rounded-lg py-1 text-black ">View NFT</button>
                   <button className=''>Cancel</button>
                </main>
            </div>
         }
    </Modal>
    </>
  )
}
