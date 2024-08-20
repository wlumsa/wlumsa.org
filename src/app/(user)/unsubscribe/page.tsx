// "use client"
// import React, { useState } from "react";
// import db from "@/firebase";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   updateDoc
// } from "firebase/firestore"; // Import Firebase Firestore functions
// export const revalidate = 3600 
// /**
//  * Renders the Unsubscribe page component.
//  */
// function DeleteDocumentPage() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleDelete = async () => {
//     try {
//       const usersRef = collection(db, "Members");
//       const q = query(usersRef, where("Email", "==", email));
//       const querySnapshot = await getDocs(q);
  
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach(async (doc) => {
//           // Update the "Newsletter" field of each matching document to false
//           await updateDoc(doc.ref, { Newsletter: false });
//         });
  
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
    <div>page</div>
  )
}

export default page