import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import TitleInput from "../../Components/Inputs/TitleInput";
import {useReactToPrint} from "react-to-print"
import axiosInstance from "../../Utils/axiosinstance";
import { API_PATHS } from "../../Utils/ApiPath";
import StepProgress from "../Auth/components/StepProgress";
import ProfileInfoForm from "./ProfileInfoForm";
import { Section, Volleyball } from "lucide-react";
import ContactInfoForm from "./ContactInfoForm";
import WorkExperience from "./WorkExperience";
import EducationDetailsForm from "./EducationDetailsForm";
import SkillsInfoForm from "./SkillsInfoForm";
import ProjectsDetailFrom from "./ProjectsDetailFrom";
import CertificationInfoForm from "./CertificationInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import RenderResume from "../../Components/ResumeTemplates/RenderResume";
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from "../../Utils/helper";
import ThemeSelector from "../../Components/ResumeSections/ThemeSelector";
import Modal from "../../Components/Modals/Modal"
const EditResume = () => {
  const { resumeId } = useParams();
  
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [DeleteModel, setDeleteModel] = useState(false)

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: ""
    },
    template: {
      theme: "",
      colorPalette: ""
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: ""
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: ""
      }
    ],
    skills: [
      {
        name: "",
        progress: 0
      }
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: ""
      }
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: ""
      }
    ],
    languages: [
      {
        name: "",
        progress: 0
      }
    ],
    interests: [""]
  });
  console.log("resumeData",resumeData);

  useEffect(()=>{

  })

  const RenderForm = ()=>{
      switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm 
            contactInfo= {resumeData?.contactInfo}
            updateSection= {(key , value)=>{
              updateSection("contactInfo", key,value);
            }}
          />
        )
       case "work-experience":
        return (
          <WorkExperience 
            workExperience= {resumeData?.workExperience}
            updateArrayItem= {(index ,key , value)=>{
              updateArraySection("workExperience", index , key ,value);
            }}
            addArrayItem = {(newItem)=> addArrayItem("workExperience", newItem) }
            removeArrayItem = {(index)=> removeArrayItem("workExperience", index) }
          />
        )

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}

            updateArrayItem={(index, key, value) =>
              updateArraySection("education", index, key, value)
            }
            addArrayItem={(newItem) =>
              addArrayItem("education", newItem)
            }
            removeArrayItem={(index) =>
              removeArrayItem("education", index)
            }
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => updateArraySection("skills", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );
      
      case "projects":
        return (
          <ProjectsDetailFrom
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) =>
              updateArraySection("projects", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );
      
      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) =>
              updateArraySection("certifications", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
          />
        );
      
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) =>
              updateArraySection(section, index, key, value)
            }
            addArrayItem={(section, newItem) =>
              addArrayItem(section, newItem)
            }
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );
      default:
        return null;
    }
  }

  const updateSection = (section , key , value)=>{
    setResumeData((prev)=>(
      {
        ...prev,
        [section]:
        {
          ...prev[section],
          [key]:value,
        }
      }
    ))
  }

  const addArrayItem = (section , newItem)=>{
    setResumeData((prev)=>(
      {
        ...prev,
        [section] : [...prev[section], newItem]
      }
    ))

  }
  const removeArrayItem = (section, index) => {
  setResumeData((prev) => {
    const updatedArray = [...prev[section]];
    updatedArray.splice(index, 1); 
    return {
      ...prev, 
      [section]: updatedArray,  
    };
  });
};


  const updateArraySection = (section , index , key , val )=>{
    setResumeData((prev)=>{
      const updateArray = [...prev[section]]
      if(key == null)
      {
        updateArray[index]= val
      }
      else
      {
        updateArray[index]={
          ...updateArray[index],
          [key]: val
        }
      }
      return {
        ...prev,
        [section]: updateArray,
      }
    })
  }

  const goToNextStep = () => {
  const pages = [
    "profile-info",
    "contact-info",
    "work-experience",
    "education-info",
    "skills",
    "projects",
    "certifications",
    "additionalInfo",
  ];

  if (currentPage === "additionalInfo") {
    setOpenPreviewModal(true);
    return;
  }

  const currentIndex = pages.indexOf(currentPage);
  if (currentIndex !== -1 && currentIndex < pages.length - 1) {
    const nextIndex = currentIndex + 1;
    setCurrentPage(pages[nextIndex]);

    const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
    setProgress(percent);

  
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};


  const goBack = ()=>{
    const pages = [
    "profile-info",
    "contact-info",
    "work-experience",
    "education-info",
    "skills",
    "projects",
    "certifications",
    "additionalInfo",
  ];

  
  const currentIndex = pages.indexOf(currentPage)
  if(currentIndex ==0)
  {
    return
  }
  const PrevPage = pages[currentIndex-1]
  const PrevIndex = currentIndex-1;
  setCurrentPage(PrevPage)
  const percent = Math.round((PrevIndex / (pages.length - 1)) * 100);
    setProgress(percent);

  
    window.scrollTo({ top: 0, behavior: "smooth" });


  


  }

  const validateAndNext = (e) => {
  const errors = []; 

  switch (currentPage) {
    case "profile-info":
      const { fullName, designation, summary } = resumeData.profileInfo;
      if (!fullName.trim()) errors.push("Full Name is required");
      if (!designation.trim()) errors.push("Designation is required");
      if (!summary.trim()) errors.push("Summary is required");
      break;

    case "contact-info":
      const { email, phone } = resumeData.contactInfo;
      if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
        errors.push("Valid email is required.");
      if (!phone.trim()) errors.push("Valid 10-digit phone number is required");
      break;

    case "work-experience":
      resumeData.workExperience.forEach(({ company, role, startDate, endDate }, index) => {
        if (!company.trim()) errors.push(`Company is required in experience ${index + 1}`);
        if (!role.trim()) errors.push(`Role is required in experience ${index + 1}`);
        if (!startDate || !endDate)
          errors.push(`Start and End dates are required in experience ${index + 1}`);
      });
      break;

    case "education-info":
      resumeData.education.forEach(({ degree, institue, startDate, endDate }, index) => {
        if (!degree.trim()) errors.push(`Degree is required in education ${index + 1}`);
        if (!institue) errors.push(`Institution is required in education ${index + 1}`);
        if (!startDate || !endDate)
          errors.push(`Start and End dates are required in education ${index + 1}`);
      });
      break;

    case "skills":
      resumeData.skills.forEach(({ name, progress }, index) => {
        if (!name.trim()) errors.push(`Skill name is required in skill ${index + 1}`);
        if (progress < 1 || progress > 100)
          errors.push(`Skill progress must be between 1 and 100 in skill ${index + 1}`);
      });
      break;

    case "projects":
      resumeData.projects.forEach(({ title, description }, index) => {
        if (!title.trim()) errors.push(`Project title is required in project ${index + 1}`);
        if (!description.trim())
          errors.push(`Project description is required in project ${index + 1}`);
      });
      break;

    case "certifications":
      resumeData.certifications.forEach(({ title, issuer }, index) => {
        if (!title.trim())
          errors.push(`Certification title is required in certification ${index + 1}`);
        if (!issuer.trim())
          errors.push(`Issuer is required in certification ${index + 1}`);
      });
      break;

    case "additionalInfo":
      if (
        resumeData.languages.length === 0 ||
        !resumeData.languages[0]?.name?.trim()
      ) {
        errors.push("At least one language is required");
      }
      if (
        resumeData.interests.length === 0 ||
        !resumeData.interests[0]?.trim()
      ) {
        errors.push("At least one interest is required");
      }
      break;

    default:
      break;
  }

  if (errors.length > 0) {
    setErrorMsg(errors[0]);
  } else {
    setErrorMsg("");
    goToNextStep(); 
  }
};


const uploadResumeImages = async () => {
    try {
        setIsLoading(true);
        fixTailwindColors(resumeRef.current);

        const imageDataUrl = await captureElementAsImage(resumeRef.current);
      
        
        

        // Convert base64 to File
        const thumbnailFile = dataURLtoFile(
            imageDataUrl,
            `resume-${resumeId}.png`
        );
        

        const profileImageFile = resumeData?.profileInfo?.profileImg || null;
        
        

        const formData = new FormData();
        if (profileImageFile) formData.append("profileImage", profileImageFile);
        if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

        const uploadResponse = await axiosInstance.put(
            API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
        

        // Call the second API to update other resume data
        await updateResumeDetails(thumbnailLink, profilePreviewUrl);

        toast.success("Resume Updated Successfully!");
        navigate("/dashboard");
    } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images");
    } finally {
        setIsLoading(false);
    }
};

const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
        setIsLoading(true);
       
        

        const response = await axiosInstance.put(
            API_PATHS.RESUME.UPDATE(resumeId),
            {
                ...resumeData,
                thumbnailLink: thumbnailLink || "",
                profileInfo: {
                    ...resumeData.profileInfo,
                    profilePreviewUrl: profilePreviewUrl || "",
                },

            }
        );
       
    } catch (err) {
        console.error("Error capturing image:", err);
    } finally {
        setIsLoading(false);
    }
};


const handleDeleteResume = async () => {
  try {
    const result = await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
    
    if (result?.data) {
      toast.success(result.data.message || "Resume deleted successfully.");
      navigate("/dashboard");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete resume. Try again.";
    toast.error(errorMessage);
    console.error("Delete error:", error);
  }
};


  const fetchResumeDetailsById =async()=>{
    try {
      const response  = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId)) 
      if(response.data && response.data.profileInfo)
      {
        const resumeInfo = response.data;
        setResumeData((prevState) => ({
        ...prevState,
        title: resumeInfo?.title || "Untitled",
        template: resumeInfo?.template || prevState?.template,
        profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
        contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
        workExperience: resumeInfo?.workExperience || prevState?.workExperience,
        education: resumeInfo?.education || prevState?.education,
        skills: resumeInfo?.skills || prevState?.skills,
        projects: resumeInfo?.projects || prevState?.projects,
        certifications: resumeInfo?.certifications || prevState?.certifications,
        languages: resumeInfo?.languages || prevState?.languages,
        interests: resumeInfo?.interests || prevState?.interests,
      }));

      }
    } catch (error) {
      console.log("Error Fetching the Resume",error);
      
    }
  }

  const updateBaseWidth = () => {
  if (resumeRef.current) {
    setBaseWidth(resumeRef.current.offsetWidth);
  }
};
  useEffect(() => {
  updateBaseWidth();
  window.addEventListener("resize", updateBaseWidth);
  if (resumeId) {
    fetchResumeDetailsById();
  }
  return () => {
    window.removeEventListener("resize", updateBaseWidth);
  };
}, [resumeId]);

  return (
    <DashboardLayout>
    <div className="container mx-auto">
      <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100py-3 px-4 mb-4 py-3 ">
        <TitleInput
          title={resumeData.title}
          setTitle={(value) =>
            setResumeData((prevState) => ({
              ...prevState,
              title: value,
            }))
          }
        />
        <div className="flex items-center gap-4">
          <button
            className="btn-small-light"
            onClick={() => setOpenThemeSelector(true)}
          >
            <LuPalette className="text-[16px]" />
            <span className="hidden md:block">Change Theme</span>
          </button>

          <button
            className="btn-small-light"
            onClick={()=> setDeleteModel(true)}
          >
            <LuTrash2 className="text-[16px]" />
            <span className="hidden md:block">Delete</span>
          </button>

          <button
            className="btn-small-light "
            onClick={() => setOpenPreviewModal(true)}
          >
            <LuDownload className="text-[16px]" />
            <span className="hidden md:block ">Preview & Download</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
          <StepProgress progress= {progress} />
          { 
            RenderForm(currentPage)
          }
         
          {errorMsg && (
            <div className=" flex items-center text-[11px] gap-2 font-medium  justify-center text-amber-600 bg-amber-100 py-0.5 px-2 my-1 rounded ">
              <LuCircleAlert className="text-md" />
              {errorMsg}
            </div>
          )}

         
          <div className="flex items-end justify-end  p-5 gap-3">
           <button
            onClick={goBack}
            disabled={currentPage === "profile-info"}
            className={`btn-small-light ${currentPage === "profile-info" ? "cursor-none opacity-50" : ""}`}
          >
            <LuArrowLeft className="text-[16px]" />
            Back
          </button>


            <button
              className="btn-small-light flex items-center gap-2 border"
              onClick={uploadResumeImages}
              disabled={isLoading}
            >
              <LuSave className="text-[16px]" />
              {isLoading ? "Updating..." : "Save & Exit"}
            </button>

            <button
              className="btn-small flex items-center gap-2"
              onClick={validateAndNext}
              disabled={isLoading}
            >
              {currentPage === "additionalInfo" ? (
                <>
                  <LuDownload className="text-[16px]" />
                  Preview & Download
                </>
              ) : (
                <>
                  <LuArrowLeft className="text-[16px] rotate-180" />
                  Next
                </>
              )}
            </button>
          </div>

        </div>

       
        <div ref={resumeRef} className="h-[100vh] bg-gray-100 rounded-lg shadow">
              
              <RenderResume
                templateId={resumeData?.template?.theme || ""}
                resumeData={resumeData}
                colorPalette={resumeData?.template?.colorPalette || []}
                containerWidth={baseWidth}
              />

        </div>
      </div>
    </div>
    <Modal
      isOpen={openThemeSelector}
      onClose={() => setOpenThemeSelector(false)}
      title="Change Theme"
    >
      <div className="w-[90vw] h-[80vh] border">
        <ThemeSelector
          selectedMeme={resumeData?.template}
          setSelectedTheme={(value) => {
            setResumeData((prevState) => ({
              ...prevState,
              template: value || prevState.template,
            }));
          }}
          resumeData={null} // ← Double check this, why are you passing null?
          onClose={() => setOpenThemeSelector(false)}
        />
      </div>
    </Modal>
    <Modal
      isOpen={openPreviewModal}
      onClose={() => setOpenPreviewModal(false)}
      title={resumeData?.title}
      showActionBtn
      actionBtnText="Download"
      actionBtnIcon={<LuDownload className="text-[16px]" />}
      onActionClick={() => reactToPrintFn()}
    >
      <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
        <RenderResume
          templateId={resumeData?.template?.theme || ""}
          resumeData={resumeData}
          colorPalette={resumeData?.template?.colorPalette || []}
        />
  </div>
    </Modal>
    <Modal
      isOpen={DeleteModel}
      onClose={() => setDeleteModel(false)}
      title="Delete Resume"
      type = "Banner"
    >
      <div className="text-black px-4 py-2">
        <p className="text-lg mb-4">
          Are you sure you want to delete the resume titled <span className="font-semibold text-red-600">"{resumeData.title}"</span>?
        </p>

        <div className="flex items-center  justify-center mt-10 gap-4">
          <button
            onClick={() => setDeleteModel(false)}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteResume}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
</Modal>

    


  </DashboardLayout>

  );
};

export default EditResume;
