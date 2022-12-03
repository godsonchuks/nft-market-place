import React ,{useState}from 'react'
import FileUpload from './fileUpload'
import marketPlaceAbi from "../../ContractABI/marketplaceAbi.json"
import { useRecoilValue } from 'recoil'
import "./createnft.css"
import { AccountState,PkState } from '../../recoilstate/globalState'
import Web3 from "web3";
import erc721V3xAbi from "../../ContractABI/v3xcollectionAbi.json"
import Modal from '../../components/Modal'
import {AiOutlineCloseCircle } from "react-icons/ai"
import toast, { Toaster } from 'react-hot-toast';
import { collection, setDoc,doc,getDoc,addDoc} from  'firebase/firestore'
import { db } from '../../firebase';

export const marketplace_contract_Address="0x5E7019F60cEBD829C7612ABFcC1c717A21743818"
export const collection_contract_Address="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"


export default function CreateNft() {

    const web3 = new Web3(window.ethereum)
    const account=useRecoilValue(AccountState)
   

  
    const [fileImage, setFileImage] = useState({
      src: "",
      alt: "upload an image",
    });
  const [tokenid,setID]=useState("")
  const [itemName,setName]=useState("")
  const [collectionName,setCName]=useState("")
  const [price,setPrice]=useState("")
  const [contractAddress,setAddress]=useState("0x4FDB2ccbCDfea469934eaFDfEf235A6dD4C3fB57")
  const [itemDescription,setDescription]=useState("")
  const [trigger,setTrigger] =useState(false)
  const [supply,setSupply] =useState("")
  const [Royalty,setRoyalty] =useState("")
  const [ImgUrl,setImgUrl]=useState("")
  
  
  const marketPlaceContract = new web3.eth.Contract(
    marketPlaceAbi,
   marketplace_contract_Address
  )
  
  const collectionContract = new web3.eth.Contract(
   erc721V3xAbi,
   contractAddress
  )
  
  const listNft=async()=>{
     const id =Number(tokenid)
     const itemPrice=Number(price)
     const fee =Number(Royalty)
     toast("Processing: Listing NFT")
    try{
       
       const tx = await marketPlaceContract.methods.makeItem(contractAddress,id,itemPrice).send({from:account})
   
     console.log(tx,"ttttttttt")
     toast(`Transaction successful
     Transaction Hash: ${tx.transactionHash}
      `)

      const docRef = await addDoc(collection(db, "pools"), {
          title:itemName,
          tokenid:tokenid,
          itemid:"",
          contractAddress:contractAddress,
          imgUrl:ImgUrl,
          owner:account,
           price:price,
          date:Number(Date.now()),
          description:itemDescription
        
         });
         console.log( docRef)
     
      }catch(e){
       console.log(e)
       toast(e.message)
       }   


  }

  const mintNftItem =async()=>{
   
    const amount =Number(supply)
    console.log(amount,"aaaa")
    toast("Processing: Minting NFT")

    
    try{
      
      const tx = await collectionContract.methods.mintNft(account,amount).send({from:account})
       
      console.log(tx,"ttttttttt")
      toast(`Transaction successful
      Transaction Hash: ${tx.transactionHash}
       `)
      }catch(e){
      console.log(e)
      toast(e.message)
      }   


   
   

   }

   //  console.log(NftCollectionContract,"mmmmmm")
    console.log(contractAddress,"addresss")
  return (
       <>
        <div className='pt-20 px-28'>
        <h5 className='text-xl font-semibold'>List an NFT</h5>
        <main className='pt-10'>
        <h5 className='text-sm text-slate-400 pb-4'>Upload file</h5>
       <FileUpload fileImage={fileImage} setFileImage={setFileImage}/>
       </main>
       <main className='pt-8'>
          <div className='flex flex-col space-y-2'>
             <label className="text-slate-400">Collection Name*</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Your collection name'
                onChange={(e)=>setName(e.target.value)}
             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">External Image Link</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Image Link'
                name="imgUrl"
                value={ImgUrl}
                onChange={(e)=>setImgUrl(e.target.value)}
             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Item Description*</label>
             <textarea 
               className='input-color py-2 h-32 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Item Name'
                onChange={(e)=>setDescription(e.target.value)}
             />
          </div>
          {/* <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Collection Name</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Your collection Name'
                onChange={(e)=>setCName(e.target.value)}
             />
          </div> */}

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Collection Contract Address</label>
             <main className='input-color flex items-center justify-between px-4 '>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm w-10/12 outline-none' 
                placeholder='Contract address'
                onChange={(e)=>setAddress(e.target.value)}
              />
              {contractAddress.length>1&&
               <button className='text-black btn-color text-xs rounded-md py-1 px-1'
                onClick={()=>setTrigger(true)}
               >Mint item</button>
              }
             </main>
          </div>
          {/* <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Token Id</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Token ID'
                onChange={(e)=>setID(e.target.value)}
             />
          </div> */}

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Royalty Fee</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Set Amount (MATIC )'

             />
          </div>

          <div className='flex flex-col space-y-2 pt-8'>
             <label className="text-slate-400">Buy Now price</label>
             <input 
               className='input-color py-2 text-slate-600 px-4 rounded-sm  outline-none' 
                placeholder='Enter Amount(ONE)'
                onChange={(e)=>setPrice(e.target.value)}
             />
          </div>

          <div className='flex space-x-4 pt-4'>
               <input type="checkbox" className='border'/>
               <label className='text-slate-400 text-sm'> Transfer copyright when purchased?</label>
         </div>

         
       </main>
       <main className='pt-6 pb-20'>
       <button className='btn-color text-black text-sm w-full py-2 rounded-md '
        onClick={listNft}
       >List item</button>
      
       </main>
          
     </div>
        <Modal trigger={trigger} cname="h-56 w-1/5 shadow rounded-lg py-4 px-8" >
         <main className='flex justify-end'>
           <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
         </main>

          <main className='flex items-center pt-4'>
            
             <input className='stake-bg w-full text-xs px-4 py-1 outline-none'
              placeholder='Supply* '
              onChange={(e)=>setSupply(e.target.value)}
             />
          </main>
          <main className='pt-10'>
           <button className='btn-color text-sm py-1 w-full text-black'
           onClick={mintNftItem}
           >
            Mint
           </button>
          </main>
          

        </Modal>
     </>
  )
}
