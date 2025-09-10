'use client'
import React from 'react'
import { Pencil } from 'lucide-react';
import { X } from 'lucide-react';
import { RoommatePost } from '@/payload-types';
import UpdateListing from '../Forms/UpdateListing';
interface Props {
  post: RoommatePost;
}

const ListingPopup: React.FC<Props> = ({ post }) => {



  return (
    <div>
      <div className=''>
        
        <button className="btn btn-secondary " onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}>
         <Pencil size={24} />

        </button>
        <dialog id="my_modal_1" className="modal">
  <div className="modal-box md:w-[52rem] max-w-[90%]">
    <div className="w-full h-[48rem]">
      <button
        className="btn bg-slate-100"
        onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
          if (modal) {
            modal.close();
          }
        }}
      >
        <X size={18} />
      </button>
      <div className='flex flex-col items-center justify-center'>
        <UpdateListing post={post} />
      </div>
    </div>
  </div>
</dialog>

      </div>
    </div>
  )
}

export default ListingPopup