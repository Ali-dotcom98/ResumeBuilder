import React from 'react'

const ColorPalette = ({ colors, isSelected, onSelect }) => {
    return (
    <div
        className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
        isSelected ? "border-purple-500" : "border-transparent"
        }`}
        onClick={onSelect}
    >
        {colors.map((color, index) => (
        <div
            key={`color_${index}`}
            className="flex-1"
            style={{ backgroundColor: color }}
        ></div>
        ))}
    </div>
    );
};


export default ColorPalette