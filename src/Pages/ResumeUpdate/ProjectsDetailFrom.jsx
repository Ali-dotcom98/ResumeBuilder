import React from "react";

import { LuPlus, LuTrash2 } from "react-icons/lu";
import Input from "../../Components/Inputs/Input";

const ProjectsDetailFrom = ({
    projectInfo,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    }) => {
    return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>

        <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectInfo.map((project, index) => (
            <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Input
                label="Project Title"
                placeholder="Portfolio Website"
                type="text"
                value={project.title || ""}
                onchange={({ target }) =>
                    updateArrayItem(index, "title", target.value)
                }
                />
                </div>
            </div>

            <div className="col-span-2">
                <label className="text-xs text-slate-600 font-medium">Description</label>
                <textarea
                placeholder="Short description about the project"
                className="w-full form-input mt-1"
                rows={3}
                value={project.description || ""}
                onchange={({ target }) =>
                    updateArrayItem(index, "description", target.value)
                }
                />
            </div>

            <div className="mb-4">
                <Input
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                type="url"
                value={project.github || ""}
                onchange={({ target }) =>
                    updateArrayItem(index, "github", target.value)
                }
                />
            </div>

            <div className="mb-4">
                <Input
                label="Live Demo URL"
                placeholder="https://yourproject.live"
                type="url"
                value={project.liveDemo || ""}
                onchange={({ target }) =>
                    updateArrayItem(index, "liveDemo", target.value)
                }
                />
            </div>

            {projectInfo.length > 1 && (
                <button
                type="button"
                className="absolute top-3 flex items-center right-3 text-sm text-red-500 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
                >
                <LuTrash2 /> Remove Project
                </button>
            )}
            </div>
        ))}

        <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
            onClick={() =>
            addArrayItem({
                title: "",
                description: "",
                github: "",
                liveDemo: "",
            })
            }
        >
            <LuPlus /> Add Project
        </button>
        </div>
    </div>
    );
};

export default ProjectsDetailFrom;
