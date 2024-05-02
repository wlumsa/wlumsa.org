"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup, showPopup } from "../../redux/popupSlice";
import { RootState } from "../../redux/store";
import MemberSignup from "./MemberSignup";

/**
 * Represents a popup component.
 * This component displays a popup window with a close button and a member signup form.
 */

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.displayed);

  const handleClose = () => {
    dispatch(hidePopup());
    localStorage.setItem("popupShown", "true");
  };

  useEffect(() => {
    if (!localStorage.getItem("popupShown")) {
      const timer = setTimeout(() => {
        dispatch(showPopup());
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [dispatch]);

  if (!isPopupOpen) {
    return null;
  }

  return (
    <div
      tabIndex={-1}
      className=" fixed left-1/2  top-1/2 z-50 w-4/5 -translate-x-1/2 -translate-y-1/2 transform  overflow-y-auto overflow-x-hidden rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-2/5 "
    >
      <div>
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 start-0 top-4 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="h-3aa w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <div>
          <MemberSignup />
        </div>
      </div>
    </div>
  );
};

export default Popup;
