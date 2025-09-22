import React, { useRef, useState } from 'react'
import { User, Trash, Upload } from "lucide-react"

const PhotoSelector = ({ image,setimage , Flag,  setImage, preview, setPreview  }) => {
   
    
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(preview || "");
     console.log("previewUrl",previewUrl);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if(!Flag)
            {
                setImage(file);
            }
            else
            {
                setimage(file);
            }
            const preview = URL.createObjectURL(file);
            console.log("preview", preview);
            setPreviewUrl(preview);
            if(!Flag) 
                setPreview(preview);
        }
    };

    const handleImageRemove = () => {
        if(!Flag)
        {
            setImage(null);
            setPreviewUrl(null);
            setPreview(null);
        }
        
        setimage(null)
       
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input
                className='hidden'
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                accept='image/*'
            />

            {!image ? (
                <div className='w-20 h-20 relative rounded-full bg-purple-100 text-purple-600  flex items-center justify-center'>
                    <User className='w-10 h-10 text-task_primary' />
                    <button
                        className='bg-gradient-to-r from-purple-500/85 to-purple-700 rounded-full p-1 text-white -right-0 absolute bottom-0'
                        type='button'
                        onClick={onChooseFile}
                    >
                        <Upload className='w-4 h-4' />
                    </button>
                </div>
            ) : (
                <div className='w-20 h-20 relative rounded-full bg-blue-100/50 flex items-center justify-center'>
                    <img className='w-20 h-20 rounded-full' src={preview || previewUrl} alt="Profile Preview" />
                    <button
                        className='bg-red-600 rounded-full p-1 text-white -right-0 absolute bottom-0'
                        type='button'
                        onClick={handleImageRemove}
                    >
                        <Trash className='w-4 h-4' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoSelector;
