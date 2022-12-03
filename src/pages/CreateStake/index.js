import React ,{useState} from 'react'
import Web3 from "web3";
import stakingAbi from "../../ContractABI/stakingpoolAbi.json"
import {AiOutlineCloseCircle } from "react-icons/ai"
import { useRecoilValue } from 'recoil'
import { AccountState,PkState } from '../../recoilstate/globalState'
import toast, { Toaster } from 'react-hot-toast';
import { collection, setDoc,doc,getDoc,addDoc} from  'firebase/firestore'
import { db } from '../../firebase';


export const staking_contract_Address ="0x42d36B4671b8eBd8D43326a45783D04888Ac0B6D"

export default function CreateStake() {
  const privateKey =useRecoilValue(PkState)
  const account=useRecoilValue(AccountState)
  const [Id,setID]=useState("")
  const [time,setTime]=useState("")
  const [amount,setAmount]=useState("")
  const { ethereum } = window;
  const web3 = new Web3(ethereum)
    const StakingContract = new web3.eth.Contract(
      stakingAbi,
     staking_contract_Address 
    )
  

  const Createpool=async()=>{
     const timer =Number(time)
     toast("Creating staking pool")
    try{
       
      const tx = await  StakingContract.methods.startingTimer(timer).send({from:account})

      const docRef = await addDoc(collection(db, "pools"), {
        ID:Id,
        apr:"47.1",
        earnings:"0",
        totalstake:"0",
        amountStake:amount,
        time:time,
        date:Number(Date.now())
       
       
        });
        console.log( docRef)
    
    console.log(tx,"ttttttttt")
    toast(`Transaction successful
      Transaction Hash: ${tx.transactionHash}
       `)

       setID("")
       setTime("")
       setAmount("")
     }catch(e){
      console.log(e)
      toast(e.message)
      }
    }

  return (
    <>
    <div className='pt-20 px-52'>
        <h5 className='text-xl font-semibold'>Create Pool</h5>
       <main className='pt-10'>
           <div className='flex flex-col space-y-2'>
             <label className="text-slate-400">Pool ID*</label>
             <main className='w-full rounded-sm input-color '>
                  <input 
                    className='input-color py-2 text-slate-600 px-4 rounded-sm w-10/12'

                      placeholder='# ID'
                      type="text"
                      name="Id"
                      value={Id}
                  />

                <button className='text-xs text-black hover:text-rose-900 btn-color rounded-full  py-0.5 px-3'
                  onClick={()=>setID(Math.floor(Math.random()*100))}
                >Generate</button>
             </main>
           </div>
           <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">End Time*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm ' 
                placeholder='In minutes'
                type="text"
                name="time"
                value={time}
                onChange={(e)=>setTime(e.target.value)}
             />
           </div>

           <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Enter amount to stake*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm ' 
                placeholder='Amount for staking'
                type="text"
                name="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
             />
           </div>

           <div className='flex space-x-4 pt-4'>
               <input type="checkbox" className='border'/>
               <label className='text-slate-400 text-sm'> Transfer copyright when purchased?</label>
         </div>

         
       </main>
       <main className='pt-6 pb-20'>
       <button className='btn-color text-black text-sm w-full py-2 rounded-md '
        onClick={Createpool}
       >Create pool</button>
      
       </main>
          
    </div>
     
    
    </>
  )
}
