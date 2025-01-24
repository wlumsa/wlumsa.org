'use client'
import React from 'react'
import { format, set } from 'date-fns';
import { postComment, deleteComment } from '@/Utils/actions';
import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { EllipsisVertical } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import axios from 'axios';
interface CommentProps {
    id: number;
    author: string;
    message: string;
    date: string;
}
interface CommentSectionProps {
    comments: CommentProps[];
    postId: string;
    postTitle: string;
    postAuthorEmail: string;
}


const Comment:React.FC<CommentProps> = ({id, author, message, date}) => {

const [isOpen, setIsOpen] = useState(false);
const openModal = () => setIsOpen(true);
const closeModal = () => setIsOpen(false);

const handleDeleteComment = async (commentId: number) => {
    const res = await deleteComment(commentId.toString());
    if(res.res) {
     // setDeleted(commentId);
        toast.success('Comment deleted');
        setIsOpen(false);
    } else {
        toast.error('Failed to delete comment');
    }
  }
  return (
    <div className='my-4'>
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-primary font-bold '>{author}</h1>
                <div className='flex flex-row gap-4'>
                  <p className='text-gray-400'>{date}</p>
                  {/* <EllipsisVertical size={24} className='text-gray-600' onClick={openModal} /> */}
                 </div> 
             
            </div>
            <p className=''>{message}</p>
        </div>
        {isOpen && 
         <div className='grid grid-cols-1 gap-4  divide-y-2 divide-gray-200'>
         <dialog open className="modal">
           <div className="modal-box">
           <div className='text-center font-bold text-red-500 border-b-2 p-2'>
               <button onClick={() => handleDeleteComment(id)} >Delete</button>
             
             </div>
             <div className='text-center  text-gray-500 p-2'>
               <button onClick={closeModal} >Cancel</button>
             </div>
           </div>
          
         </dialog>
       
             
         </div>}
    </div>
  )
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId, postTitle, postAuthorEmail }) => {
    const [commentInput, setCommentInput] = useState('');
    const [newComments, setNewComments] = useState<CommentProps[]>(comments);
    const [deleted, setDeleted] = useState<number | null>(null);


    if(deleted) {
        setNewComments(newComments.filter(comment => comment.id !== deleted));
    }

    const handlePostComment = async () => {
        const comment = await postComment(commentInput, parseInt(postId));
   
        if(comment.res) {
            toast.success('Comment posted');
            setNewComments([...newComments, { 
                id: comment.res.id, 
                author: comment.res.author ? comment.res.author : '', 
                message: comment.res.comment || '',
                date: comment.res.createdAt 
            }]);
            //send an email to the post author
            try {
              //get post author email
              //get post title
              await axios.post("/api/sendComment", 
              { postAuthorEmail: postAuthorEmail, name: `${comment.res.author}`, postTitle: postTitle, message: comment.res.comment}
              )
              
             } catch(error) {
               console.log(error);
              
             }
             
        } else {
            toast.error('Failed to post comment');
        }
        setCommentInput('');
      }

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(event.target.value);
      }

   const {isSignedIn} = useUser();


  
  return (
    <div className="my-8">
     { isSignedIn && ( <div className="">
         
          <div className="flex flex-row gap-4 w-full">
            
            <input type="text" placeholder="Write a comment" className="w-full border-2 border-primary rounded-lg px-4 py-2" value={commentInput} onChange={handleInputChange}  />
          <button className="bg-primary font-bold text-white rounded-lg px-4 py-2" onClick={() => handlePostComment() }  > Post</button>
            </div>
          </div> )}
      
      { !isSignedIn && (<div className="my-8 bg-gray-100 rounded-lg flex gap-4 flex-row justify-between items-center">
        <h1 className='text-primary font-bold p-4  '>Sign in to post a comment</h1>
       <div className='btn btn-primary text-white'>
        <SignInButton />
        </div>
      </div> )}
      <div className='flex flex-col-reverse'>

      {newComments.map((comment, index) => (
        <Comment key={comment.id} id={comment.id} author={comment.author || ''} message={comment.message} date={format(new Date(comment.date), 'MMMM dd')} />
      ))}
      </div>
      
    </div>

  );
};

export default CommentSection;


