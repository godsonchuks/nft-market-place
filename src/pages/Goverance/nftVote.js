import React, {useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import stakingAbi from "../../ContractABI/stakingpoolAbi.json"
import {AiOutlineCloseCircle } from "react-icons/ai"
import { useRecoilValue } from 'recoil'
import { AccountState,PkState } from '../../recoilstate/globalState'
import toast, { Toaster } from 'react-hot-toast';
import { collection, onSnapshot, doc,getDocs,query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import { nftVoteData } from "../../utils/data/nft-vote.data";
import view from "../../assests/goverance/view.svg";
import { async } from "@firebase/util";
import harmony from "../../assests/harmony.png"
import Web3 from "web3";


export const staking_contract_Address ="0x1Ce0fD6bB86bB8F55aa5663b01D550fCB17099c9"


const NftVote = () => {
  const [text, setText] = useState(0);
  const privateKey =useRecoilValue(PkState)
  const account=useRecoilValue(AccountState)
  const [itemId,setItemID]=useState(0)
  const [TokenId,setTokenID]=useState(0)
  const [trigger,setTrigger]=useState(false)
  const [collectionAddr,setCollection]=useState("")
  const [nftAddress,setAddress]=useState("")
  const [nftVoteData,setData]=useState([])

  const [nft,setNft]=useState({})

  useEffect(()=>{
    const getCollections=async()=>{
      const q = query(collection(db, "collections"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const nfts=[]
      // console.log(querySnapshot)
      querySnapshot.docs.map((doc)=>{
         // console.log(doc.data())
         nfts.push({...doc.data(),id:doc.id})
         setNft({...doc.data(),id:doc.id})

         
       })
       setData(nfts)
    }
    getCollections()
   },[])

   console.log(nftVoteData)
   const { ethereum } = window;
   const web3 = new Web3(ethereum)
  const StakingContract = new web3.eth.Contract(
      stakingAbi,
     staking_contract_Address 
    )
  
  const PurchaseNft=async()=>{
    toast("Processing Transactions")
    try{
       
      const tx = await  StakingContract.methods.purchaseNftItem(collectionAddr,itemId).send({from:account})
    
    
    console.log(tx,"ttttttttt")
    toast(`Transaction successful
      Transaction Hash: ${tx.transactionHash}
       `)

    setItemID("")
    setTokenID("")
     setCollection("")
       setAddress("")
     
     }catch(e){
      console.log(e)
      toast(e.message)
      }
  }

  const TransferNft=async()=>{
    toast("Processing Transactions")
    try{

      const txVrf = await   StakingContract.methods.randomNum().send({from:account})
    
      console.log(Number(txVrf).toString().slice(0,1))
      const num=Number(txVrf).toString().slice(0,1)
      toast(`VRF Number: ${num}`)
       
      const tx = await StakingContract.methods.transferNft(nftAddress,TokenId).send({from:account})
   
    
    
    console.log(tx,"ttttttttt")
    toast(`Transaction successful
      Transaction Hash: ${tx.transactionHash}
       `)

    setItemID("")
    setTokenID("")
     setCollection("")
       setAddress("")
     
     }catch(e){
      console.log(e)
      toast(e.message)
      }
  }
  return (
    <div className="w-full md:mt-0 mt-9">
      <div className="bg-[#2D2D2D] rounded-[8px] py-8 px-[22px]">
        <h1 className="capitalize font-bold mb-2 text-xl md:text-2xl md:leading-[41px] text-white">
          Vote
        </h1>
        <p className="text-[#777E90] text-sm mb-5">Select an NFT to vote for</p>
        {nftVoteData.map((item) => (
          <>
          <div className="flex justify-between items-center mb-4" >
            <label class="form-control">
              <input type="checkbox" name="checkbox" value="Bike" />
              {item?.title}
            </label>
              <h5 className="flex items-center space-x-1"
                onClick={()=>setTrigger(true)}
                >
              <span>View details</span>
              <img src={view} alt="" />
              </h5>
            
         
          </div>

          <Modal trigger={trigger} cname="h-56 w-1/3 shadow rounded-lg py-4 px-8">
              <main className='flex justify-end'>
                <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
              </main>
         
         <div className='flex flex-col pt-4'>
            <main className="flex text-slate-400 text-xs justify-between w-full items-center ">
               <h5>Item</h5>
               <h5>Total</h5>
            </main>
            <main className='stake-bg px-4 py-4 flex justify-between w-full items-center mt-2' >
               <div className='flex items-center space-x-2'>
                  <img src={item?.imgUrl} className="w-12 h-12 rounded-md"/>
                  <h5 className='flex flex-col text-xs'>
                     <span className='text-slate-400'>{item?.title}</span>
                     <span className='font-semibold'>{`${item?.title} #1`}</span>
                     <span className='text-slate-400'>Royalty Fee :{"0.1 ONE"}</span>
                  </h5>
               </div>

               <div>
                 <h5 className='flex items-center space-x-1 text-xs'><img src={harmony } className="w-4  h-4"/> <span>{item?.price}</span></h5> 
                 <h5 className='text-xs text-slate-400'>{item?.price *4 } V3T</h5>
               </div>
              
            </main>
  
           </div>

          </Modal>
          </>
        ))}
        <div>
          <p className="text-white text-[13px] leading-7 mb-4 capitalize font-medium">
            enter amount to stake
          </p>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Enter Amount"
              value={text}
              className="text-sm leading-4 focus:outline-none w-full pr-2 bg-[#29282E] px-3 py-4 rounded-lg border border-[#475467] mr-2 text-white"
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn-color w-[180px] font-medium xl:text-base xl:leading-[18px] rounded-[40px] h-10 ">
              Vote
            </button>
          </div>
          <p className="text-[#E8EDF0] mt-4 text-sm">{text} $</p>
        </div>
      </div>
           
      <div className="pt-10">
          <main className="flex flex-col space-x-4">
              <h5>Purchase NFT</h5>
              <label className="pt-4">
              
              <input
                  type="number"
                  placeholder="Paste MarketPlace Contract Address"
                  name="collection"
                  value={collection}
                  className="text-sm leading-4 focus:outline-none w-full pr-2 bg-[#29282E] px-3 py-4 rounded-lg border border-[#475467] mr-2 text-white"
                  onChange={(e)=>setCollection(e.target.value)}
             />

            </label>
            <label className="flex items-center pt-4">
              
              <input
                  type="number"
                  placeholder="Item ID"
                  name="itemId"
                  value={itemId}
                  className="text-sm leading-4 focus:outline-none w-full pr-2 bg-[#29282E] px-3 py-4 rounded-lg border border-[#475467] mr-2 text-white"
                  onChange={(e)=>setItemID(e.target.value)}
                  
             />
                <button className="btn-color w-[180px] font-medium xl:text-base xl:leading-[18px] rounded-[40px] h-10 " 
                  onClick={ PurchaseNft}
                >Purchase</button>
            </label>

            </main>

            <main className="flex flex-col space-x-4 pt-10">
              <h5>Transfer NFT</h5>
              <p className="text-sm text-slate-400">Purchased NFT will be airdropped to random staker in the pool</p>
              <label className="pt-4">
              
              <input
                  type="number"
                  placeholder="Paste NFT Collection Contract Address"
                  name="nftAddress"
                  value={nftAddress}
                  className="text-sm leading-4 focus:outline-none w-full pr-2 bg-[#29282E] px-3 py-4 rounded-lg border border-[#475467] mr-2 text-white"
                  onChange={(e)=>setAddress(e.target.value)}
                  
                  
             />

            </label>
            <label className="flex items-center pt-4 ">
              
              <input
                  type="number"
                  placeholder="Token ID"
                  name="TokenId"
                  value={TokenId}
                  className="text-sm leading-4 focus:outline-none w-full pr-2 bg-[#29282E] px-3 py-4 rounded-lg border border-[#475467] mr-2 text-white"
                  onChange={(e)=>setTokenID(e.target.value)}
                  
                  
             />
                <button className="btn-color w-[180px] font-medium xl:text-base xl:leading-[18px] rounded-[40px] h-10 " 
                 onClick={TransferNft}
                >Transfer</button>
            </label>

            </main>

      </div>
    </div>
  );
};

export default NftVote;
