import React from 'react'
import PhotoSelector from '../Auth/components/PhotoSelector';
import Input from '../../Components/Inputs/Input';

const ProfileInfoForm = ({ profileData, updateSection, onNext }) => {  
    console.log("profileData",profileData);
      
    return (
        <div className="px-5 pt-5">
            <h2 className="text-lg  font-semibold text-gray-900">Personal Information</h2>

            <div className="mt-4">
                <PhotoSelector
                    image={profileData?.profileImg || profileData?.profilePreviewUrl}
                    setImage={(value) => updateSection("profileImg", value)}
                    preview={profileData?.profilePreviewUrl}
                    setPreview={(value) => updateSection("profilePreviewUrl", value)}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input
                    value={profileData?.fullName || ""}
                    onchange={({ target }) => updateSection("fullName", target.value)}
                    label="Full Name"
                    placeholder="John"
                    type="text"
                    />

                    <Input
                        value={profileData?.designation || ""}
                        onchange={({ target }) => updateSection("designation", target.value)}
                        label="Designation"
                        placeholder="UI Designer"
                        type="text"
                    />
                </div>

                <div className="col-span-2 mt-3 ">
                    <label className="text-xs font-medium text-slate-600">
                    Summary
                    </label>
                    <textarea
                        placeholder="Short Introduction"
                        className="form-input resize-none"
                        rows={4}
                        value={profileData?.summary || ""}
                        onChange={({ target }) => updateSection("summary", target.value)}
                    />
                </div>
            </div>

            {/* <button
            onClick={onNext}
            className="btn-primary mt-4"
            >
            Next
            </button> */}
        </div>
    );
};


export default ProfileInfoForm