import React from "react";

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      className={`h-auto md:h-[300px] flex flex-col items-center justify-between  p-2 rounded  overflow-hidden cursor-pointer
        ${isSelected ? "border-purple-500 border-2" : "border border-gray-200"}`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img src={thumbnailImg} alt="Template" className="w-full rounded" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
    </div>
  );
};

export default TemplateCard;


