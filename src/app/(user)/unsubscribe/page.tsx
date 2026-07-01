"use client";
import React, { useState } from "react";
import { removeMemberFromNewsletter } from "@/Utils/actions";
import toast from "react-hot-toast";

/**
 * Renders the Unsubscribe page component.
 */
function DeleteDocumentPage() {
  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const res = await removeMemberFromNewsletter(email);
    if (res.errors) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  };

  return (
    <div className="mx-auto  mt-28 max-w-xl items-center justify-center px-2">
      <div className="flex flex-col gap-2 py-2 text-center font-semibold">
        <h1 className="text-2xl text-primary">
          Unsubscribe from WLU MSA Mailing list
        </h1>
        <p>You will no longer receive email updates from us.</p>
        <input
          type="email"
          required
          placeholder="MyLaurier Email"
          className="input input-bordered w-full text-neutral focus:border-secondary"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button
          onClick={handleDelete}
          type="submit"
          className="btn border-0 bg-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"
        >
          Submit ➜
        </button>
      </div>
    </div>
  );
}

export default DeleteDocumentPage;
