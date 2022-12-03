
// images 
import verifyIcon from '../../assests/icon/verify.png'
import twitterIcon from "../../assests/social-icons/twitter.png"
import telegramIcon from "../../assests/social-icons/telegram.png"
import discordIcon from "../../assests/social-icons/discord.png"
import sofiah from "../../assests/sofiah.png"
import collectionImage from "../../assests/landingPage/new-collections/collection1.png"
import harmonyIcon from "../../assests/harmony.png"

const Rapture = () => {
    const socials = [
        {
            link: '/',
            icon: twitterIcon,
        },
        {
            link: '/',
            icon: telegramIcon,
        },
        {
            link: '/',
            icon: discordIcon,
        },
    ]

    const nftData = [
        {
            name: 'traded',
            value: '0.35',
        },
        {
            name: 'PLAYERS',
            value: '0.35',
        },
        {
            name: 'LISTED',
            value: '0.35',
        },
        {
            name: 'VOL.(ONE)',
            value: '0.35',
        },
        {
            name: 'FLOOR(ONE)',
            value: '0.35',
        },
    ]

    const nfts = Array(20).fill(
        {
            image: collectionImage,
            nftName: 'Sofiah obirin NFT',
            collectionName: 'Sofiah #101',
            price: 30,

        }
    )
    return (
        <div>
            <div className='mt-[100px]'>

                {/* header */}
                <header>
                    <div className="flex items-center justify-center space-x-[10px]">
                        <h1 className="text-xl md:text-[40px] md:leading-[46px] font-bold capitalize">Sofiah obirin NFT</h1>
                        <img src={verifyIcon} alt="" className='h-5 w-5' />
                    </div>

                    {/* social links */}
                    <div className="flex items-center justify-center space-x-[52px] my-7">
                        {
                            socials.map((item, index) => (
                                <a key={index} href={item.link} className="">
                                    <img src={item.icon} alt="" className='' />
                                </a>
                            ))
                        }
                    </div>

                    {/* nft data */}
                    <div className="flex items-center justify-center space-x-2 md:space-x-10 lg:space-x-[120px]">
                        {
                            nftData.map((item, index) => (
                                <div key={index} className="">
                                    <h3 className="text-b3 text-xs md:text-sm md:leading-4 uppercase">{item.name}</h3>
                                    <h1 className="font-medium text-xl text-[#f5f5f5] text-center">{item.value}</h1>
                                </div>
                            ))
                        }
                    </div>

                    {/* nft description */}
                    <p className="mt-6 text-lightdark text-xs md:text-base md:leading-6 text-center md:w-4/5 max-w-[862px] mx-auto">
                        This paper analyzes the synergies/tradeoffs involved A multivariate probit (MVP) model involving a system of four equations for the adoption decision of improved varieties of barley, potatoes, wheat and faba beans was...
                        see more
                    </p>

                    <div className="mt-10 md:mt-[66px]">
                        <img src={sofiah} alt=""  className='w-full'/>
                    </div>
                </header>

                {/* nft collections */}
                <div className="mt-[50px] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-6 gap-y-8 ">
                    {nfts.map((item, index) => (
                        <div key={index}>
                            {/* nft collection image */}
                            <div>
                                <img src={item.image} alt="" className='w-full' />
                            </div>
                            <div className="mt-[19px] space-y-2">
                                <div className="flex justify-between">
                                    <div className="flex items-center space-x-[10px]">
                                        <p className="capitalize text-base leading-[18px] text-[#777E90]">{item.nftName}</p>
                                        <img src={verifyIcon} alt="" className='h-4 w-4 md:h-5 md:w-5' />
                                    </div>
                                    <p className="capitalize text-base leading-[18px] text-[#777E90]">price</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="capitalize font-medium text-xl leading-[23px]">{item.collectionName}</p>
                                    <div className="flex items-center space-x-2">
                                        <img src={harmonyIcon} alt="" className='h-5 w-5' />
                                        <p className='uppercase text-[#58BD7D] font-medium text-xl leading-[23px]'>{item.price} One</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                    }
                </div>

            </div>
        </div>
    )
}

export default Rapture