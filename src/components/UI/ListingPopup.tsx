'use client'
import React from 'react'
import Listing from '../Forms/Listing';
const ListingPopup = () => {
  return (
    <div>
         <div>
        {/* <button className="btn btn-primary text-white">New Listing</button> */}
        <button className="btn" onClick={()=>{
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}>new post</button> 
<dialog id="my_modal_1" className="modal">
  <div className="modal-box m-10 w-screen-lg ">
    <div className="w-screen-lg  h-[36rem]">
    
      {/* <button className="btn">Close</button> */}
        <Listing />
        </div>
  </div>
</dialog>
      </div>
    </div>
  )
}

export default ListingPopup