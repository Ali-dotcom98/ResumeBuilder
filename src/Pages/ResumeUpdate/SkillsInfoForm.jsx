import React from 'react'
import { LuPlus, LuTrash2 } from "react-icons/lu"
import Input from '../../Components/Inputs/Input';
import RatingInput from '../../Components/Inputs/RatingInput';

const SkillsInfoForm = ({skillsInfo,updateArrayItem,addArrayItem,removeArrayItem}) => {
  return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
        <div className="mt-4 flex flex-col gap-4 mb-3">
            {skillsInfo?.map((skill, index) => (
                <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input

                            label="Skill Name"
                            placeholder="JavaScript"
                            type="text"
                            value={skill.name || ""}
                            onchange={({ target }) =>
                                updateArrayItem(index, "name", target.value)
                            }
                        />

                        <div className="">
                            <label className="">
                                Proficiency ({(skill.progress / 20) || 0}/5)
                            </label>
                            <div className="mt-5">
                                {/* You can add a slider input here if needed */}
                                <RatingInput
                                    value={skill.progress || 0}
                                    total = {5}
                                    onchange={(newValue) =>
                                        updateArrayItem(index, "progress", newValue)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {skillsInfo.length > 1 && (
                        <button
                            type="button"
                            className="absolute top-3 flex items-center right-3 text-sm text-red-500 hover:underline cursor-pointer"
                            onClick={() => removeArrayItem(index)}
                        >
                            <LuTrash2 />
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
                onClick={() =>
                    addArrayItem({
                        name: "",
                        progress: 0,
                    })
                }
            >
                <LuPlus /> Add Skill
            </button>
        </div>
    </div>
);

}

export default SkillsInfoForm