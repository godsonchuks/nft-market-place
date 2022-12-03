import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useRecoilValue } from 'recoil';
import { PkState } from '../../recoilstate/globalState';
import Modal from '../Modal'

const SendFundsModal = ({ showSendFundsModal, setShowSendFundsModal, balance }) => {
    const initialFormData = {
        address: '',
        amount: '',
    }
    const handleClose = () => setShowSendFundsModal(false)
    const [formData, setFormData] = useState(initialFormData)
    const privatek = useRecoilValue(PkState)


    const handleTextChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const  transfer = async(address,amount) => {

      }
      
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Number(formData.amount) > balance) {
            handleClose()
            toast.error("Insufficient balance") 
        }
        transfer(formData.address, formData.amount)
    }
    return (
        <Modal trigger={showSendFundsModal} cname=" w-4/5 max-w-md shadow rounded-lg py-8 px-8" >
            <main className='flex justify-between items-center'>
                <h1 className="text-white flex-1 text-center text-2xl leading-[29px] capitalize font-bold font-ubuntu">send funds</h1>
                <button onClick={handleClose}>
                    <AiOutlineCloseCircle className="text-sm" />
                </button>
            </main>

            <form className='space-y-8 mt-8' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="address" className='text-base leading-[18px] text-[#D9D9D9]'>Enter wallet address of recipient</label>
                    <input type="text" name='address' id='address' className='bg-[#24262B] rounded-[5px] mt-4 w-full py-[15px] px-3 focus:outline-none' value={formData.address} onChange={handleTextChange} />
                </div>
                <div>
                    <label htmlFor="amount" className='text-base leading-[18px] text-[#D9D9D9]'>Enter amount</label>
                    <input type="number" name='amount' id='amount' className='bg-[#24262B] rounded-[5px] mt-4 w-full py-[15px] px-3 focus:outline-none' value={formData.amount} onChange={handleTextChange} />
                </div>
                <button className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Submit</button>
            </form>

            {/* <main className='flex items-center py-8'>
        <p className="text-base leading-[18px] text-center text-[#D9D9D9]">Transfer funds from an exchange or another wallet to your wallet address below:</p>
    </main>
    <main className='pt-10 flex space-x-8 items-center'>
        <p className="bg-[#24262B] rounded-[5px] py-[15px] px-3 text-lightdark text-sm leading-4">
            account
            {`${account.substring(0, 20)}...${account.substring(account.length - 4)}`}
        </p>
        <button className='btn-color h-12 rounded-[40px] capitalize text-white  text-sm py-1 w-[161px]'
            onClick={copyToClipboard}                 >
            copy address
        </button>
    </main> */}


        </Modal>)
}

export default SendFundsModal