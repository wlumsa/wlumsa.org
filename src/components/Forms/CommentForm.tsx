"use client"
import React, { useState} from 'react'


const CommentForm = () => {
    const [summary, setSummary] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
          summary,
        };
    }
  return (
    <div>
         <div className="flex flex-col py-6">
              <div className="flex text-center justify-center">
                <h1 className="text-primary text-3xl font-bold ">Comments</h1>
                <button className="btn btn-secondary mx-4 shrink-0 items-center justify-center rounded-full hover:bg-secondary">
                <svg className="feather feather-edit text-primary" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </div>
            </div>
    <div className="flex items-center">
      <div className="w-full px-2 md:w-[30rem]">
        <form className="card-body" onSubmit={handleSubmit}>
        <div><h1 className='font-bold text-primary'>Add a Comment</h1></div>
          <div className="flex flex-col gap-2 py-2">
            <textarea
              required
              placeholder="Message"
              className="textarea textarea-bordered w-full text-neutral focus:border-secondary"
              rows={1}
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
            ></textarea>
          </div>
          <div className="card-actions justify-end">
            <button className='btn'>Cancel</button>
            <button
              type="submit"
              className="btn border-0 bg-secondary text-primary shadow duration-200 hover:scale-105 hover:text-base-100">
              Post ➜
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CommentForm;