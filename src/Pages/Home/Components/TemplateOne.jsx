import {
LuMapPinHouse,
LuMail,
LuPhone,
LuRss,
LuGithub,
LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import React, { useRef, useEffect, useState } from "react";
import ContactInfo from "../../../Components/ResumeTemplates/ContactInfo";
import EducationInfo from "../../../Components/ResumeTemplates/EducationInfo";
import { formatYearMonth } from "../../../Utils/helper";
import LanguageSection from "../../../Components/ResumeTemplates/LanguageSection";
import WorkExperience from "../../../Components/ResumeTemplates/WorkExperience";
import ProjectInfo from "../../../Components/ResumeTemplates/ProjectInfo";
import SkillSection from "../../../Components/ResumeTemplates/SkillSection";
import CertificationInfo from "../../../Components/ResumeTemplates/CertificationInfo";


const Title = ({ text, color }) => {
    return (
        <div className="relative w-fit mb-2.5">
        <span
            className="absolute bottom-0 left-0 w-full h-2"
            style={{ backgroundColor: color }}
        ></span>
        <h2 className="relative text-sm font-bold">{text}</h2>
        </div>
    );
};

 const themes = [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],   
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F767", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#A8D2F4", "#1E88E5", "#0D47A1"],
]

    


const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800); // Default value
    const [scale, setScale] = useState(1);
    const [toggleColor, settoggleColor] = useState(0)
    const themeColors = colorPalette?.length > 0 ? colorPalette : themes[toggleColor];
    
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            settoggleColor((prev)=>(prev+1 )% themes.length)
        },2000);
        return ()=> clearInterval(interval);
    },[])

    useEffect(() => {
        if (resumeRef.current) {
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / actualBaseWidth);
        }
    }, [containerWidth]);

   


    return (
    <div  style={{ width: containerWidth, overflow: 'hidden' }}>
        <div
        ref={resumeRef}
        className="p-3 bg-white"
        style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${baseWidth}px`, // Keep the original width when not scaled
      
        }}>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 py-10" style={{ backgroundColor: themeColors[0] }}>
                <div className="flex flex-col items-center px-2 ">
                    <div className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center  justify-center" style={{ backgroundColor: themeColors[1] }}>
                        {resumeData.profileInfo.profilePreviewUrl ? (
                        <img
                            src={resumeData.profileInfo.profilePreviewUrl}
                            className="w-[90px] h-[90px] rounded-full"
                            alt="Profile Preview"
                        />
                        ) : (
                        <div className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full" style={{ color: themeColors[4] }}>
                            <LuUser />
                        </div>
                        )}
                    </div>

                    <h2 className=" text-xl font-bold mt-3 ">{resumeData.profileInfo.fullName || "NO"}</h2>
                    <p className="text-sm text-center ">{resumeData.profileInfo.designation}</p>
                </div>
                <div className="my-6 mx-6">
                    <div className="flex flex-col gap-4">
                        <ContactInfo
                        icon={<LuMapPinHouse />}
                        iconBG={themeColors[2]}
                        value={resumeData.contactInfo.location}
                        />
                        <ContactInfo
                        icon={<LuMail />}
                        iconBG={themeColors[2]}
                        value={resumeData.contactInfo.email}
                        />
                        <ContactInfo
                        icon={<LuPhone />}
                        iconBG={themeColors[2]}
                        value={resumeData.contactInfo.phone}
                        />

                        {resumeData.contactInfo.linkedin && (
                        <ContactInfo
                            icon={<RiLinkedinLine />}
                            iconBG={themeColors[2]}
                            value={resumeData.contactInfo.linkedin}
                        />
                        )}

                        {resumeData.contactInfo.github && (
                        <ContactInfo
                            icon={<LuGithub />}
                            iconBG={themeColors[2]}
                            value={resumeData.contactInfo.github}
                        />
                        )}

                        {resumeData.contactInfo.website && (
                        <ContactInfo
                            icon={<LuRss />}
                            iconBG={themeColors[2]}
                            value={resumeData.contactInfo.website}
                        />
                        )}

                    </div>
                    <div className="mt-5">
                        <Title text="Education" color={themeColors[1]} />
                        {resumeData.education.map((data, index) => (
                            <EducationInfo
                            key={`education_${index}`}
                            degree={data.degree}
                            institution={data.institue}
                            duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                            />
                        ))}
                    </div>
                    <div className="mt-5">
                        <Title text="Languages" color={themeColors [1]} />
                        <LanguageSection
                        languages={resumeData. languages}
                        accentColor={themeColors [3] }
                        bgColor={themeColors [2]}
                        />
                    </div>

                </div>
            </div>
            <div className="col-span-8 pt-10 mr-10 pb-5">
                <div>
                    <Title text="Professional Summary" color={themeColors[1]} />
                    <p className="text-sm font-medium">
                        {resumeData?.profileInfo?.summary}
                    </p>
                </div>

                <div className="mt-4">
                    <Title text="Work Experience" color={themeColors[1]} />
                    {resumeData?.workExperience?.map((data, index) => (
                        <WorkExperience
                        key={`work_${index}`}
                        company={data.company}
                        role={data.role}
                        duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                        durationColor={themeColors[4]}
                        description={data.description}
                        />
                    ))}
                </div>
                <div className="mt-4">
                    <Title text="Projects" color={themeColors[1]} />
                    {resumeData?.projects?.map((project, index) => (
                        <ProjectInfo
                        key={`project_${index}`}
                        title={project.title}
                        description={project.description}
                        githubLink={project.github}
                        liveDemoUrl={project.liveDemo}
                        bgColor={themeColors[2]}
                        />
                    ))}
                </div>
                <div className="mt-4">
                    <Title text="Skills" color={themeColors[1]} />
                    <SkillSection
                        skills={resumeData.skills}
                        accentColor={themeColors[3]}
                        bgColor={themeColors[2]}
                    />
                </div>
                <div className="mt-4">
                    <Title text="Certifications" color={themeColors[1]} />
                    <div className="grid grid-cols-2 gap-2.5">
                        {resumeData.certifications.map((data, index) => (
                        <CertificationInfo
                            key={`cert_${index}`}
                            title={data.title}
                            issuer={data.issuer}
                            year={data.year}
                            bgColor={themeColors[2]}
                        />
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <Title text="Interests" color={themeColors[1]} />
                    <div className="flex items-center flex-wrap gap-3 mt-4">
                        {resumeData.interests.map((interest, index) => {
                        if (!interest) return null;
                        return (
                            <div
                            key={`interest_${index}`}
                            className="text-[10px] font-medium py-1 px-3 rounded-lg"
                            style={{ backgroundColor: themeColors[2] }}
                            >
                            {interest}
                            </div>
                        );
                        })}
                    </div>
                </div>



                

            </div>
        </div>
    </div>
    </div>

    );
};

export default TemplateOne;

