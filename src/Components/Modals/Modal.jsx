import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
  type
}) => {
  if (!isOpen) return null;
  console.log(title);
  

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      <div className={`relative bg-white flex flex-col   shadow-lg rounded-lg overflow-hidden ${type == "Banner" ? "w-[39vw] h-[50vh]": "w-[95vw] h-[95vh]"} `}>

        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            {showActionBtn && (
              <button
                className="btn-small-light flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
                onClick={onActionClick}
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
