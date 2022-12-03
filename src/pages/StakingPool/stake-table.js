import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import ellipse from "../../assests/poolEllipse.png"
import Modal from '../../components/Modal'
import stakingAbi from "../../ContractABI/stakingpoolAbi.json"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useRecoilValue } from 'recoil'
import { AccountState, PkState } from '../../recoilstate/globalState'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import Web3 from "web3";


export const staking_contract_Address = "0x42d36B4671b8eBd8D43326a45783D04888Ac0B6D"

export default function StakeTable() {
  const [pool, setPool] = useState([])
  const [stake, setStake] = useState({})
  const [earings, setEarnings] = useState([])
  const [trigger, setTrigger] = useState(false)
  const privateKey = useRecoilValue(PkState)
  const account = useRecoilValue(AccountState)
  const [join, setJoin] = useState(false)
  const [hasStake, setStaked] = useState(false)
  const [token, setToken] = useState("")
  const { ethereum } = window;
  const web3 = new Web3(ethereum)
  const StakingContract = new web3.eth.Contract(
    stakingAbi,
    staking_contract_Address
  )

  useEffect(() => {
    const getStake = async () => {
      const q = query(collection(db, "pools"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const stakes = []
      // console.log(querySnapshot)
      querySnapshot.docs.map((doc) => {
        // console.log(doc.data())
        stakes.push({ ...doc.data(), id: doc.id })
        setStake({ ...doc.data(), id: doc.id })


      })
      setPool(stakes)
    }
    getStake()

  }, [])

  const getStakeData = async () => {
    setTrigger(true)
    try {

      const tx = await StakingContract.methods.totalEarnedReward().call()

      console.log(Number(tx))
      setEarnings([Number(tx)])


    } catch (e) {
      console.log(e)
      toast('Someting went wrong')
    }
  }



  const stakeToken = async (amount) => {
    console.log(token)
    const stakeAmount = Number(amount)
    console.log(stakeAmount)

    if (token === "") return console.log("empty")
    toast("Processing Transaction")
    if (token == "one") {
      console.log("one")
      try {

        const tx = await StakingContract.methods.stakeONE().send({ from: account })


        console.log(tx, "ttttttttt")
        toast(`Transaction successful
          Transaction Hash: ${tx.transactionHash}
           `)
        setToken("")
        setStaked(true)
      } catch (e) {
        console.log(e)
        toast(e.message)
      }

    } else {
      console.log("v3t")
      const stakeV3t = Number(amount) * 4
      console.log(stakeV3t)
      try {

        const tx = await StakingContract.methods.stakeToken(stakeV3t).send({ from: account })


        console.log(tx, "ttttttttt")
        toast(`Transaction successful
            Transaction Hash: ${tx.transactionHash}
           `)
        setStaked(true)
      } catch (e) {
        console.log(e)
        toast(e.message)
      }

      setToken("")

    }
  }

  const unStakeToken = async () => {

    toast("Processing Transaction")

    try {

      const tx = await StakingContract.methods.unStake().send({ from: account })


      console.log(tx, "ttttttttt")
      toast(`Transaction successful
          Transaction Hash: ${tx.transactionHash}
           `)
      setToken("")
      setStaked(true)
    } catch (e) {
      console.log(e)
      toast(e.message)
    }


  }

  return (
    <div className='pt-10'>
      <div className='flex space-x-40 stake-bg py-2 px-8 items-center '>
        <h5 className='text-sm'>POOL</h5>
        <h5 className='text-sm'>TOTAL STAKE</h5>
        <h5 className='text-sm'>EARNINGS</h5>
        <h5 className='text-sm'>APR</h5>
        <h5 className='text-sm'>ENDS</h5>
        <h5 className='text-sm'></h5>
      </div>

      <div className="min-h-min py-10 overflow-y-scroll">
        {pool.map((pool) =>
          <>
            <div className='flex items-center space-x-36 pt-4 px-4'>
              <h5 className='flex items-center space-x-1'>
                <img src={ellipse} className="w-4 h-4" />
                <span className='text-sm font-semibold'>{`Pool#${pool?.ID}`}</span>
              </h5>

              <h5 className=''>{pool?.totalstake} MATIC</h5>
              <h5 className='flex flex-col justify-center'>
                <span className='font-semibold'>{pool.earnings}</span>
                <span className='text-slate-400 text-xs'>0 USD</span>
              </h5>
              <h5>{pool?.apr}%</h5>
              <h5 className='flex flex-col justify-center'>
                <span className='font-semibold'>{`In  ${1 + Number(pool?.time)} mins`}</span>
                <span className='text-slate-400 text-xs'>(Sep 30, 2022, 6:26 AM)</span>
              </h5>
              <button className='border border-slate-800 px-2 py-1 text-xs w-24 rounded-full'
                onClick={getStakeData}
              >View Details</button>
            </div>

            <Modal trigger={trigger} cname="h-72 w-2/5 shadow rounded-lg py-4 px-8" >
              <main className='flex justify-end'>
                <button onClick={() => setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
              </main>

              <div>
                <h5 className='font-semibold'>Pool Details</h5>
                <main className='flex flex-col pt-4'>
                  <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>APR</span> <span className='w-1/2'>{pool?.apr}%</span></h5>
                  <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>Min. stake per user:</span> <span className='w-1/2'>{pool?.amountStake} ONE</span></h5>

                  <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>Ends in</span> <span className='w-1/2'>{`In  ${1 + Number(pool?.time)} mins`} (Sep 30, 2022, 6:26 AM)</span></h5>
                  <h5 className='flex items-center justify-between text-sm text-slate-400 w-full'><span className='w-1/2'>Number of stakers</span> <span className='w-1/2'>{"0"}</span></h5>
                </main>

                <main className='flex w-full items-center justify-between border stake-bg rounded-md py-2 mt-4 px-4'>
                  <div className='w-3/4'>
                    <h5 className='text-xs text-slate-400'>Pool rewards</h5>
                    <h5 className='flex flex-col'>
                      <span className='text-xs  font-semibold'>{earings} MATIC</span>
                      <span className='text-xs  text-slate-400'>{earings * 0.0023} USD</span>
                    </h5>
                  </div>
                  <div className='w-1/4'>
                    {hasStake === false &&
                      <button className='stake-btn px-2 py-2  rounded-sm text-xs font-semibold'>Enter Governace</button>
                    }
                    {hasStake === true &&
                      <Link to="/governace"> <button className='btn-color px-2 py-2  rounded-sm text-xs font-semibold'>Enter Governace</button></Link>
                    }
                  </div>

                </main>
                <main className='flex justify-center pt-4'>
                  {join === false &&
                    <button className='btn-color text-black px-2 py-1 text-xs font-semibold rounded-sm'
                      onClick={() => setJoin(true)}
                    >Join pool</button>
                  }

                  {join === true &&
                    <>
                      {hasStake === false &&
                        <button className='btn-color text-black px-2 py-1 space-x-1 flex text-xs font-semibold rounded-sm'

                        >

                          <span
                            onClick={() => stakeToken(pool?.amountStake)}
                          >
                            Stake
                          </span>
                          <select name="cars" id="cars" className='text-xs text-slate-600 btn-color outline-none'
                            onChange={(e) => setToken(e.target.value)}
                          >
                            <option value="one" className='stake-bg outline-none'>MATIC</option>
                            <option value="v3t" className='stake-bg outline-none'>V3T</option>
                          </select>
                        </button>

                      }
                      {hasStake === true &&
                        <button className='btn-color text-black px-2 py-1 text-xs font-semibold rounded-sm'
                          onClick={unStakeToken}
                        >Unstake</button>
                      }
                    </>
                  }

                </main>
              </div>
            </Modal>
          </>

        )

        }

      </div>
    </div>
  )
}
