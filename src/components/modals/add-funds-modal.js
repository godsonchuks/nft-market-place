import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { AccountState } from '../../recoilstate/globalState'
import Modal from '../Modal'

const AddFundsModal = ({ trigger, setTrigger }) => {
    const account = useRecoilValue(AccountState)
    const handleClose = () => setTrigger(false)
    const copyToClipboard = () => {
        navigator.clipboard.writeText(account);
        handleClose()
        toast.success('Account details copied successfully')
    }
    return (
        <Modal trigger={trigger} cname=" w-4/5 max-w-md shadow rounded-lg py-8 px-8" >
            <main className='flex justify-between items-center'>
                <h1 className="text-white flex-1 text-center text-2xl leading-[29px] capitalize font-bold font-ubuntu">add funds</h1>
                <button onClick={handleClose}>
                    <AiOutlineCloseCircle className="text-sm" />
                </button>
            </main>

            <main className='flex items-center py-8'>
                <p className="text-base leading-[18px] text-center text-[#D9D9D9]">Transfer funds from an exchange or another wallet to your wallet address below:</p>
            </main>
            <main className='pt-10 flex space-x-8 items-center'>
                <p className="bg-[#24262B] rounded-[5px] py-[15px] px-3 text-lightdark text-sm leading-4">
                    {/* {account} */}
                    {`${account?.substring(0, 20)}...${account?.substring(account?.length - 4)}`}
                </p>
                <button className='btn-color h-12 rounded-[40px] capitalize text-white  text-sm py-1 w-[161px]'
                    onClick={copyToClipboard}                 >
                    copy address
                </button>
            </main>


        </Modal>
    )
}

export default AddFundsModal