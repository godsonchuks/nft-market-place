import React ,{useState,useEffect} from 'react'
import {FaEthereum} from "react-icons/fa"
import harmony from "../../assests/harmony.png"
import toast, { Toaster } from 'react-hot-toast';

import { ethers } from 'ethers';
import erc721V3xAbi from "../../ContractABI/v3xcollectionAbi.json"
import BridgeABI from "../../ContractABI/BridgeMintNft.json"
import CustodyABI from "../../ContractABI/bridgeCustodialAbi.json"
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { AccountState } from '../../recoilstate/globalState'
// import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { POSClient,use,getPOSClient} from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

import detectEthereumProvider from '@metamask/detect-provider';


use(Web3ClientPlugin);


export const collection_contract_Address="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"

export default function Bridge() {

    const account=useRecoilValue(AccountState)
    const [chain,setChain]=useState("")
    const [nfts,setNfts]= useState([])
    const [desctChain,setDest]= useState("")
    const [deposited,setDeposit] =useState(false)
    const [tokenId,setID]=useState(0)
   const posClient = new POSClient();

   const web3 = new Web3(window.ethereum)
  
   useEffect(()=>{

     const initPos= async()=>{

      await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
          provider: window.ethereum,
          defaultConfig: {
            from :  account
          }
        },
        child: {
          provider: window.ethereum,
          defaultConfig: {
            from :  account
          }
        }
    });
     }

     initPos()
    },[])
           
            
    const retreiveNft= async()=>{

      if (chain == "matic") {
        console.log("matic")

        const contractAddress ="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"

        const CollectionContract = new web3.eth.Contract(
          erc721V3xAbi ,
          contractAddress 
        )
        const itemArray = [];
       const value=  await CollectionContract.methods.walletOfOwner(account).call()
          value.forEach(async(id) => {
              let token = parseInt(id, 16)             
                const rawUri = CollectionContract.methods.tokenURI(token).call()
                const Uri = Promise.resolve(rawUri)
                const getUri = Uri.then(value => {
                  let str = value
                  let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
                  let metadata = fetch(cleanUri).catch(function (error) {
                    console.log(error.toJSON());
                  });
                  return metadata;
                })
                getUri.then(async value => {
                  const data =await value.json()
                  let rawImg = data.image
                  
                  var description= data?.description
                  let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
                    let meta = {
                      
                      img: image,
                      tokenId: token,
                      wallet: account,
                      description
                    }
                    itemArray.push(meta)
                  })
                })
                setNfts(itemArray)

                console.log(itemArray,"items" )

      }else{

          
        const contractAddress ="0x05924C2C2e39Ec4Cff55b6Ff64C81A19cB84eDf3"

        const CollectionContract = new web3.eth.Contract(
          erc721V3xAbi ,
          contractAddress 
        )

        const itemArray = [];
        const value=  await CollectionContract.methods.walletOfOwner(account).call()
           value.forEach(async(id) => {
               let token = parseInt(id, 16)             
                 const rawUri = CollectionContract.methods.tokenURI(token).call()
                 const Uri = Promise.resolve(rawUri)
                 const getUri = Uri.then(value => {
                   let str = value
                   let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
                   let metadata = fetch(cleanUri).catch(function (error) {
                     console.log(error.toJSON());
                   });

                   console.log(metadata)
                   return metadata;
                 })
                 getUri.then(async (value) => {

                  const data= await value.json()

                   let rawImg = data?.image
                   var description= data?.description
                   let image = rawImg?.replace('ipfs://', 'https://ipfs.io/ipfs/')
                     let meta = {
                       img: image,
                       tokenId: token,
                       wallet: account,
                       description
                     }
                     itemArray.push(meta)
                   })
                 })
                 setNfts(itemArray)
 
                 console.log(itemArray,"items" )
      }
        

    }

    const approveNft= async (id) => {
      setID(id)
      if (chain == "matic") {
        console.log("matic")

        const contractAddress ="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"


      const client = await getPOSClient();
      const erc721RootToken = posClient.erc721(contractAddress,true);
      const approveResult = await erc721RootToken.approve(id);
      const txHash = await approveResult.getTransactionHash();
      toast(txHash);

      }else{
         
        const contractAddress ="0x05924C2C2e39Ec4Cff55b6Ff64C81A19cB84eDf3"


        const client = await getPOSClient();
        const erc721RootToken = posClient.erc721(contractAddress,true);
        const approveResult = await erc721RootToken.approve("");
        const txHash = await approveResult.getTransactionHash();
        toast(txHash);
  
      }
    }

    const depositNft = async () => {
      

     if (chain == "matic") {
        console.log("matic")

        const contractAddress ="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"

      const client = await getPOSClient();
      const erc721RootToken = posClient.erc721(contractAddress, true);
      const result = await erc721RootToken.deposit(tokenId, account);
      const txHash = await result.getTransactionHash();
      toast(txHash);
     }else{

      const contractAddress ="0x05924C2C2e39Ec4Cff55b6Ff64C81A19cB84eDf3"

      const client = await getPOSClient();
      const erc721RootToken = posClient.erc721(contractAddress, true);
      const result = await erc721RootToken.deposit(tokenId, account);
      const txHash = await result.getTransactionHash();
      toast(txHash);

     }
    }

    const burnWithdraw = async (id) => {

      const maticContract="0xaBC2545899CfDe4f71A5b10A6DF5303eF97e41b3"
      const ethContract="0x05924C2C2e39Ec4Cff55b6Ff64C81A19cB84eDf3"
      if (desctChain == "matic") {
        console.log("matic")
      
      const client = await getPOSClient();
      const erc721Token = posClient.erc721(maticContract);
      const result = await erc721Token.withdrawStart(tokenId);
      const txHash = await result.getTransactionHash();
      toast(txHash);
      const erc721RootToken = posClient.erc721(ethContract, true);
      const res= await erc721RootToken.withdrawExit(txHash);
      const hash = await res.getTransactionHash();
      toast(hash);
      }else{
     
      const client = await getPOSClient();
      const erc721Token = posClient.erc721(ethContract);
      const result = await erc721Token.withdrawStart(tokenId);
      const txHash = await result.getTransactionHash();
      toast(txHash);
      const erc721RootToken = posClient.erc721(maticContract, true);
      const res= await erc721RootToken.withdrawExit(txHash);
      const hash = await res.getTransactionHash();
      toast(hash);
      }
      deposited(false)
    }
    
  return (
    <div className='pt-32 px-24'>
        <div>
            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg'>
                <h5 className='text-xl font-light'>1.Transfer From</h5>
                <div className='px-8'>
                    <h5 className='text-md font-semibold'>Source</h5>

                    <select name="cars" id="cars" className='text-lg  mt-2 text-slate-200 w-full outline-none text-center bg-black py-3 px-8 rounded-lg'
                      onChange={(e)=>setChain(e.target.value)}
                    >
                        <option value="matic" className='outline-none'>
                            Polygon
                        </option>
                        <option value="eth" className='outline-none flex'>
                           Ethereum
                        </option>
                  </select> 

                </div>

                <main className='pt-8 px-8'>
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2 '
                     onClick={retreiveNft}
                    >Retrieve Assets</button>
                </main>
            </main>

           <main className='stake-bg py-6 rounded-lg px-4 shadow-lg mt-6'>
                <h5 className='text-xl font-light'>2.Select NFT to transfer </h5>
                
                 <div className="mt-5 lg:mt-[33px] space-y-10 md:space-y-0 md:gap-5 lg:gap-6 md:grid grid-cols-2 lg:grid-cols-3">
                    {nfts.map((nft)=>{
                      console.log(nft,"bbbbbb")
                        return(
                           <div className="flex ">
                            <main className='flex flex-col space-y-2'>
                            <img  src={nft.img}/>
                            <h5>Token ID: {nft.tokenId}</h5>
                            <button className='btn-color flex justify-center text-black text-sm py-1 '
                              onClick={approveNft(nft.tokenId)}
                             >Approve</button> 
  
                            </main>
                            
                           </div>
                        )
                    })}
                 </div>

                
            </main> 


            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg  mt-6'>
                <h5 className='text-xl font-light'>3.Transfer to</h5>
                <div className='px-8'>
                    <h5 className='text-md font-semibold'>Destination</h5>

                    <select name="cars" id="cars" className='text-lg  mt-2 text-slate-200 w-full outline-none text-center bg-black py-3 px-8 rounded-lg'
                        onChange={(e)=>desctChain(e.target.value)}
                    >
                        <option value="matic" className='outline-none'>
                            Polygon
                        </option>
                        <option value="eth" className='outline-none flex'>
                           Ethereum
                        </option>
                  </select> 

                </div>

              

               
            </main> 

            <main className='stake-bg py-6 rounded-lg px-4 shadow-lg mt-6'>
                <h5 className='text-lg'>4.Review Transfer details and confirm</h5>
                <div className='h-14'>
                  

                </div>
                {deposited===false&&
                <main className='pt-8'>
                    <button className='btn-color w-full text-black rounded-md font-semibold py-2'
                        onClick={depositNft }
                    >Deposit</button>
                </main>
              }
               
               {deposited===true&&
              <main className='pt-8'>
              <button className='btn-color w-full text-black rounded-md font-semibold py-2'
                  onClick={burnWithdraw}
              >Withdraw NFT</button>
          </main>
             
               }

               </main>
        </div>
    </div>
  )  
}
