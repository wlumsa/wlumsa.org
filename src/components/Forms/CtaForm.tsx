"use client"
import React, { useState } from "react";
import axios from "axios";

interface CtaFormProps {
  category: string;
}

/**
 * CtaForm component represents a form used for submitting a call-to-action.
 * @param {CtaFormProps} props - The component props.
 * @param {string} props.category - The category of the call-to-action.
 * @returns {JSX.Element} The rendered CtaForm component.
 */
const CtaForm: React.FC<CtaFormProps> = ({ category }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [summary, setSummary] = useState("");
  const [categoryState, setCategoryState] = useState(category);

  /**
   * Handles the form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      fullName,
      email,
      phoneNumber,
      studentId,
      summary,
      category: categoryState,
    };

    try {
      const response = await axios.post("/api/contact", formData);
      console.log(response.data);
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setStudentId("");
      setSummary("");
    } catch (error) {
      console.error("Error sending form: ", error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="w-full rounded-xl bg-primary px-2 md:w-[30rem]">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
              <input
                type="text"
                required
                placeholder="Full Name"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
              <input
                type="email"
                required
                placeholder="MyLaurier Email"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <input
                type="string"
                required
                placeholder="Student ID"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setStudentId(e.target.value.toString())}
                value={studentId}
              />
              <textarea
                required
                placeholder="Message"
                className="textarea textarea-bordered w-full text-neutral focus:border-secondary"
                rows={4}
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
              ></textarea>
            </div>
            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn border-0 bg-secondary text-primary shadow duration-200 hover:scale-105 hover:text-base-100"
              >
                Submit ➜
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CtaForm;
