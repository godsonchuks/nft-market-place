import { useRef, useState } from 'react'
import FileIcon from "../../assests/file.png"

export default function FileUpload({fileImage, setFileImage}) {

   
        // const [fileImage, setFileImage] = useState({
        //     src: "",
        //     alt: "upload an image",
        // });
    
        const hiddenFileInput = useRef(null)
    
        const handleClick = event => {
            event.preventDefault()
            hiddenFileInput.current.click()
        }
    
        const handleChange = e => {
            const fileUploaded = e.target.files[0]
            if (fileUploaded) {
                setFileImage({
                    src: URL.createObjectURL(fileUploaded),
                    alt: fileUploaded.name,
                });
            }
           // handleFile(fileUploaded)
        }
    
        const handleRemoveFile = () => {
            setFileImage({})
           // handleFile(null)
        }
    
  return (
    
    <div className='w-full min-h-min py-6 relative rounded-[5px] border border-dashed border-[#8A92B2] grid place-items-center'>
       {
                fileImage.src ? (
                    <img src={fileImage.src} alt="" />
                ) : (
                    <div className="flex flex-col items-center">
                        <img src={FileIcon} alt="" />
                        <p className="text-sm leading-4 capitalize text-[#62646C] text-center mt-4 mb-3">Images, videos, gifs and music files (Maximum 100MB)</p>
                        <button className="w-[134px] rounded-lg h-[42px] btn-color text-black"
                         onClick={handleClick}
                         >
                            Upload file
                        </button>
                           
                           
                       
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            className="hidden"
                        />
                    </div>
                )
            }
          
    </div>
  )
}

