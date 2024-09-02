// "use client"
// import React, { useState } from "react";

// export const revalidate = 3600 
// /**
//  * Renders the Unsubscribe page component.
//  */
// function DeleteDocumentPage() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleDelete = async () => {
//     try {
//       //search, and update
//       const res = await fetch(`/api/deleteDocument?email=${email}`, {
//         method: "DELETE",
//       });
//       if (email === "") {
//         setMessage(`${email} unsubscribed from newsletter successfully.`);
//       } else {
//         setMessage(`No document with email ${email} found.`);
//       }
//     } catch (error) {
//       console.error("Error updating document:", error);
//       setMessage("Error, contact ahme2085@mylaurier.ca");
//     }
//   };

//   return (
//     <div className="max-w-xl px-2 mt-20 justify-center items-center">
//       <div className="flex flex-col gap-2 py-2">
//         <h1>Unsubscribe</h1>
//         <input
//           type="email"
//           required
//           placeholder="MyLaurier Email"
//           className="input input-bordered w-full text-neutral focus:border-secondary"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />
//         <button
//           onClick={handleDelete}
//           type="submit"
//           className="btn border-0 bg-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"
//         >
//           Submit ➜
//         </button>
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// }

// export default DeleteDocumentPage;

import React from 'react'

const page = () => {
  return (
    <div className='mt-60 text-center'> 
    <h1 className='text-4xl'> Temporarily Down</h1>
    </div>
  )
}

export default page