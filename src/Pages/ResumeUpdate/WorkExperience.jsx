import React from "react";

import { LuPlus, LuTrash2 } from "react-icons/lu";
import Input from "../../Components/Inputs/Input";

const WorkExperienceForm = ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
  console.log("workExperience",workExperience);
  
return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>

        <div className="mt-4 flex flex-col gap-4 mb-3">
            {workExperience.map((experience, index) => (
            <div className="border border-gray-200/80 p-4 rounded-lg relative" key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                    label="Company"
                    placeholder="ABC Corp"
                    type="text"
                    value={experience.company || ""}
                    onchange={({ target }) => updateArrayItem(index,"company", target.value)}
                    />

                    <Input
                    label="Role"
                    placeholder="Frontend Developer"
                    type="text"
                    value={experience.role || ""}
                    onchange={({ target }) => updateArrayItem(index, "role", target.value)}
                    />

                    <Input
                    label="Start Date"
                    type="month"
                    value={experience.startDate || ""}
                    onchange={({ target }) => updateArrayItem(index, "startDate", target.value)}
                    />

                    <Input
                    label="End Date"
                    type="month"
                    value={experience.endDate || ""}
                    onchange={({ target }) => updateArrayItem(index, "endDate", target.value)}
                    />

                </div>
                <div className="mt-4">
                    <label className="text-xs font-medium text-slate-600">Description</label>
                    <textarea
                        placeholder="What did you do in this role?"
                        className="form-input w-full mt-1"
                        rows={3}
                        value={experience.description || ""}
                        onChange={({ target }) => updateArrayItem(index, "description", target.value)}
                    />
                </div>

                {workExperience.length > 1 && (
                <button type="button" className="absolute top-3 flex items-center right-3 text-sm text-red-500 hover:underline cursor-pointer" onClick={() => removeArrayItem(index)}>
                    <LuTrash2 /> Remove
                </button>
                )}
            </div>
            ))}
        </div>

      <button
        type="button"
        className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
        onClick={() =>
          addArrayItem({
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
      >
        <LuPlus /> Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
