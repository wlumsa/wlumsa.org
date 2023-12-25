import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hidePopup, showPopup } from "../redux/popUpSlice"
import { RootState } from '../redux/store';
import MemberSignup from './MemberSignup';

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.displayed);

  const handleClose = () => {
    dispatch(hidePopup());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(showPopup());
    }, 4000); 

    // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!isPopupOpen) {
    return null;
  }

  return (
    <div  tabIndex={-1} className=" md:w-2/5 w-4/5  rounded-lg overflow-y-auto overflow-x-hidden z-50 bg-white p-4  border border-gray-300 shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div>
        <button  onClick={handleClose} type="button" className="absolute top-4 right-4 start-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg className="w-3 h-3aa" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
                  <span className="sr-only">Close modal</span>
        </button>
        
        <div >
          <MemberSignup/>
        </div>
      </div>
    </div>
  )
}

export default Popup