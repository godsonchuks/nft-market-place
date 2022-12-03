import React,{useState,useEffect}from 'react'
import { collection, onSnapshot, doc,getDocs,query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import Harmonyimg from "../../assests/polygon.png"
import Favorite from "../../assests/favorite.png"
import { Link } from 'react-router-dom'
export default function Collections() {
    const [collectionNft,setCollection] =useState([])
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
         setCollection(nfts)
      }
      getCollections()
     },[])
     console.log(collectionNft)
  return (
    <div className='pt-6'>
     <h5 className='text-2xl  font-semibold text-slate-300'>Discover</h5>

     <div className="mt-5 lg:mt-[33px] space-y-10 md:space-y-0 md:gap-5 lg:gap-6 md:grid grid-cols-2 lg:grid-cols-3">
       {
        collectionNft.map((item,index)=>
        <Link key={index } to={`/item/${item.title}`}
                state={{
                 item
                   }}
                 >
        <div className="bg-[#2D2D2D] rounded-lg px-3 pb-6 pt-3">
        <div className="relative">
            <img src={item?.imgUrl} className="w-full" alt="" />
            <img src={Favorite} alt="" className="absolute right-5 top-5" />
        </div>
        <div className="mt-10 flex justify-between items-center">
            <div>
                <h1 className="text-white font-medium capitalize md:text-xl md:leading-[23px] mb-2">{item?.title}</h1>
                <p className="text-[#95979F] text-sm md:ext-base md:leading-[18px]">{item?.owner.slice(0,11)+"..."}</p>
            </div>
            <div>
                <h1 className="text-[#95979F] capitalize text-sm md:text-base md:leading-[18px]">Price</h1>
                <div className="flex items-center space-x-2">
                    <img src={Harmonyimg} className="h-3 w-3" alt="" />
                    <p className="text-white">{item.price} MATIC</p>
                </div>
            </div>
        </div>
    </div>
    </Link>
        )
       }
     </div>
        </div>
  )
}
