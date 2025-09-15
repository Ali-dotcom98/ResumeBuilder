import React, { useRef, useState } from "react";
import { fixTailwindColors, captureElementAsImage, dataURLtoFile } from "./Utils/helper.js";
import axios from "axios";

const BoxWidthTracker = () => {
  const resumeRef = useRef();
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);
      fixTailwindColors(resumeRef.current);

      const imageDataUrl = await captureElementAsImage(resumeRef.current);
      setPreview(imageDataUrl);

      const thumbnailFile = dataURLtoFile(imageDataUrl, "resume-thumbnail.png");
      console.log("thumbnailFile",thumbnailFile);
      

      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile);
      

      alert(preview);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div
        ref={resumeRef}
        className="bg-yellow-100 p-6 rounded-md shadow-md w-[400px] mb-4"
      >
        <h2 className="text-xl font-bold">My Resume</h2>
        <p className="text-gray-700">This is a sample resume for testing.</p>
      </div>

      <button
        onClick={uploadResumeImages}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Capture & Upload"}
      </button>

      {preview && (
        <div className="mt-4">
          <h4>Preview:</h4>
          <img src={preview} alt="Resume Preview" className="" />
        </div>
      )}
    </div>
  );
};

export default BoxWidthTracker;
