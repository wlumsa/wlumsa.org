"use client"


import { toast } from 'react-hot-toast';
import { Toaster } from "react-hot-toast";

import { useActionState } from 'react'

import { memberSignup,State } from '@/Utils/actions';
import { useState, useEffect } from 'react'

const initialState: State = { errors: {}, message: null }
/**
 * Component for member signup form.
 */
const MemberSignup: React.FC = () => {

  /**
   * Handles form submission.
   * @param e - The form event.
   */



  //make sure to query the collection before adding members

  const [state, formAction] = useActionState(memberSignup, initialState)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast.error(state.message)
      } else {
        toast.success(state.message)
      }
    }
  }, [state])

  return (
    <div className="flex w-full items-center justify-center bg-base-100 py-2">
      <div className="max-w-xl px-2">
        <h3 className="card-title text-3xl text-primary duration-200 hover:scale-105 lg:text-4xl">
          Become a member!
        </h3>
        <p className="text-neutral lg:text-lg">
          You'll receive all the latest news and information.
        </p>
        <form className="card-body" action={formAction}>

          <div className="flex flex-col gap-2 py-2">
          <input
              type="text"
              required
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              aria-invalid={!!state.errors?.firstName}
              aria-describedby="firstName-error"
            />
            {state.errors?.firstName && (
              <p id="firstName-error" className="text-sm text-red-500">{state.errors.firstName}</p>
            )}
            <input
              type="text"
              required
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              aria-invalid={!!state.errors?.lastName}
              aria-describedby="lastName-error"
            />
            {state.errors?.lastName && (
              <p id="lastName-error" className="text-sm text-red-500">{state.errors.lastName}</p>
            )}
            <input
              type="email"
              required
              name="email"
              placeholder="MyLaurier Email"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              aria-invalid={!!state.errors?.email}
              aria-describedby="email-error"
            />
            {state.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">{state.errors.email}</p>
            )}
            <input
              type="text"
              required
              name="studentId"
              placeholder="Student ID"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              aria-invalid={!!state.errors?.studentId}
              aria-describedby="studentId-error"
            />
            {state.errors?.studentId && (
              <p id="studentId-error" className="text-sm text-red-500">{state.errors.studentId}</p>
            )}
            <label className="label cursor-pointer">
              <span className="label-text">Newsletter Signup</span>
              <input
                type="checkbox"
                name="newsLetter"
                className="toggle"
                defaultChecked={true}
              />
            </label>
          </div>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn border-0 bg-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"
            >
              Submit ➜
            </button>
          </div>
        </form>
      </div>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default MemberSignup;
