import React, { useEffect, useRef, useState } from "react";
import {
  dummyResume,
  resumeTemplates,
  themeColorPalette,
} from "../../Utils/data";
import { LuCircleCheckBig } from "react-icons/lu";
import Tabs from "../ResumeTemplates/Tabs";
import TemplateCard from "../Card/TemplateCard";
import ColorPalette from "../Card/ColorPalette";
import RenderResume from "../ResumeTemplates/RenderResume";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  onClose,
}) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Templates");

  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette || [],
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  // Handle Theme Change
  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette.colors,
      theme: selectedTemplate.theme,
    });
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="flex items-center justify-between mb-5 mt-2">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
        <button
          className="btn-small-light flex items-center gap-1"
          onClick={handleThemeSelection}
        >
          <LuCircleCheckBig className="text-[16px]" />
          Done
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-5 bg-white">
          <div className="grid grid-cols-2 gap-5 max-h-[80vh] overflow-scroll custom-scrollbar">
            {tabValue === "Templates" &&
              resumeTemplates.map((template, index) => (
                <TemplateCard
                  key={`templates_${index}`}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate?.index === index}
                  onSelect={() => setSelectedTemplate({ theme: template.id, index })}
                />
              ))
            }
            {tabValue === "Color Palettes" &&
              themeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => setSelectedColorPalette({ colors, index })}
                />
              ))}


          </div>
        </div>

        <div className="col-span-12 md:col-span-7 bg-white -mt-3" ref={resumeRef}>
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={ dummyResume}
            containerWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors || []}
          />
        </div>

      </div>
    </div>
  );
};

export default ThemeSelector;
