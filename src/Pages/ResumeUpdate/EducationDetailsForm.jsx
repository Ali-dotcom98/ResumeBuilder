import React from 'react'

import { LuPlus, LuTrash2 } from "react-icons/lu"
import Input from '../../Components/Inputs/Input';
const EducationDetailsForm = ({educationInfo,updateArrayItem,addArrayItem,removeArrayItem}) => {
return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
          {educationInfo.map((education, index) => (
            <div className="border border-gray-200/80 p-4 rounded-lg relative" key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                    label="Degree"
                    placeholder="B. Tech in Computer Science"
                    type="text"
                    value={education.degree || ""}
                    onchange={({ target }) =>
                        updateArrayItem(index, "degree", target.value)
                    }
                    />

                    <Input
                    label="Institution"
                    placeholder="XYZ University"
                    type="text"
                    value={education.institue || ""}
                    onchange={({ target }) =>
                        updateArrayItem(index, "institution", target.value)
                    }
                    />

                    <Input
                    label="Start Date"
                    type="month"
                    value={education.startDate || ""}
                    onchange={({ target }) =>
                        updateArrayItem(index, "startDate", target.value)
                    }
                    />

                    <Input
                    label="End Date"
                    type="month"
                    value={education.endDate || ""}
                    onchange={({ target }) =>
                        updateArrayItem(index, "endDate", target.value)
                    }
                    />

                    {educationInfo.length > 1 && (
                    <button type="button" className="absolute top-3 flex items-center right-3 text-sm text-red-500 hover:underline cursor-pointer" onClick={() => removeArrayItem(index)}>
                        <LuTrash2 /> {/* Icon to delete education block */}
                    </button>
                    )}
                </div>
            </div>
        ))}
      </div>

        <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"

            onClick={() =>
            addArrayItem({
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
            })
            }
        >
            <LuPlus /> Add Education
        </button>
    </div>
);

}

export default EducationDetailsForm