import React from "react";

import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../Components/Inputs/RatingInput";
import Input from "../../Components/Inputs/Input";


const AdditionalInfoFrom = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Additional Info</h2>

      {/* Languages Section */}
      <div className="mt-4 flex flex-col gap-4 mb-3">
        <h3 className="text-sm font-semibold   text-gray-900">Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languages?.map((lang, index) => (
            
             <div className=" border border-gray-200/80  p-4 rounded-lg col-span-2 relative">
                 <Input

                label="Language"
                placeholder="e.g. English"
                value={lang?.name || ""}
                onchange={({ target }) =>
                  updateArrayItem("languages", index, "name", target.value)
                }
              />
              <div className="flex flex-col  items-end">
                <div className="space-y-2">
                    <label className="">Proficiency</label>
                    <RatingInput
                    value={lang?.progress || 0}
                    onchange={(value) =>
                        updateArrayItem("languages", index, "progress", value)
                    }
                    total={5}
                    activeColor="#0ea5e9"
                    inactiveColor="#e0f2fe"
                    />
                </div>
                </div>
                    {languages.length > 1 && (
                        <button
                        type="button"
                        className="absolute -translate-x-5  top-1/2 -translate-y-4 flex items-center right-3 text-sm text-red-500 hover:underline cursor-pointer"

                        onClick={() => removeArrayItem("languages", index)}
                        >
                        <LuTrash2 />
                        </button>
                    )}
                </div>
           
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"

            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Language
          </button>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mt-4 flex flex-col gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Interest</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
          {interests?.map((interest, index) => (
            
              <div className="relative border border-gray-200/80 p-4 rounded-lg col-span-2">
                <Input
                    placeholder="e.g. Reading"
                    value={interest || ""}
                    onchange={({ target }) =>
                    updateArrayItem("interests", index, null, target.value)
                    }
                />
                {interests.length > 1 && (
                    <button
                    type="button"
                    className="absolute -translate-x-5  -translate-y-10  flex items-center right-3 text-sm text-red-500 hover:underline cursor-pointer"

                    onClick={() => removeArrayItem("interests", index)}
                    >
                    <LuTrash2 />
                    </button>
                )}
              </div>
           
          ))}
          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"

            onClick={() => addArrayItem("interests", "")}
          >
            <LuPlus /> Add Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoFrom;
