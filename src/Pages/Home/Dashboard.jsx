import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../Utils/ApiPath";
import axiosInstance from "../../Utils/axiosinstance";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { LucideCirclePlus } from "lucide-react";
import moment from "moment"
import ResumeSummaryCard from "../../Components/Card/ResumeSummaryCard";
import Modal from "../../Components/Modals/Modal";
import CreateResumeForm from "./CreateResumeForm";


const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL); // Fixed syntax
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return <DashboardLayout activeMenu={"Dashboard"}>
     <div className="font-urbanist grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
    <div
      className="h-[300px] flex flex-col gap-5 items-center justify-center border-2 border-dashed border-purple-300 rounded-md cursor-pointer "
      onClick={() => setOpenCreateModal(true)}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-full">
        <LucideCirclePlus className="text-xl text-purple-500" />
      </div>
      <h3 className="font-medium text-gray-800">Add New Resume</h3>
    </div>
     {allResumes?.map((resume) => (
      <ResumeSummaryCard
        key={resume?._id}
        imgurl={resume?.thumbnaillink || null}
        title={resume?.title || "Untitled Resume"}
        lastUpdated={
          resume?.updatedAt
            ? moment(resume.updatedAt).format("Do MMM YYYY")
            : "Unknown"
        }
        onSelect={() => navigate(`/resume/${resume?._id}` )}
      />
    ))}
  </div>
   
   <Modal
    isOpen={openCreateModal}
    title={"Banner"}
    onClose={() => setOpenCreateModal(false)}
    hideHeader
  >
    <div>
      <CreateResumeForm />
    </div>
  </Modal>


  </DashboardLayout>;
};

export default Dashboard;
