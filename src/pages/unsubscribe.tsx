import React, { useState } from 'react';
import db from '../firebase';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'; // Import Firebase Firestore functions

function DeleteDocumentPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      // Reference the db collection and query for documents with matching email
      const usersRef = collection(db, 'Members');
      const q = query(usersRef, where('Email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          // Delete each matching document
          await deleteDoc(doc.ref);
        });

        setMessage(`${email} removed from newsletter successfully.`);
      } else {
        setMessage(`No document with email ${email} found.`);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      setMessage('Error, contact ahme2085@mylaurier.ca');
    }
  };

  return (
    <div className='max-w-xl px-2'>
        <div className="flex flex-col gap-2 py-2">
        <h1>Unsubscribe</h1>
        <input 
                type="email" 
                required
                placeholder="MyLaurier Email" 
                className="input input-bordered w-full text-neutral focus:border-secondary" 
                onChange={(e)=>setEmail(e.target.value) } value = {email}
                                />
        <button onClick={handleDelete} type="submit" className="btn text-secondary bg-primary hover:bg-secondary hover:text-primary border-0 shadow hover:scale-105 duration-200">Submit ➜</button>
        <p>{message}</p>
        </div>
    </div>
  );
}

export default DeleteDocumentPage;
