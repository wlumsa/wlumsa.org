"use client"
import { useState } from "react";
import { collection, addDoc,query,getDocs,where} from "firebase/firestore";
import db from "../../firebase";
import { toast } from 'react-hot-toast';
import { Toaster } from "react-hot-toast";
const MemberSignup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [newsLetter, setNewsLetter] = useState(true);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const membersCollection = collection(db, "Members");
      const sameMemberQuery = query(membersCollection, where("Email", "==", email));
      const querySnapshot = await getDocs(sameMemberQuery);
  
      if (!querySnapshot.empty) {
        toast.error("User already exists.");
        return;
      }
  
      const docRef = await addDoc(membersCollection, {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        StudentId: studentId,
        Newsletter: newsLetter,
      });
  
      console.log("Document written", docRef);
      setFirstName("");
      setLastName("");
      setEmail("");
      setStudentId("");
      setNewsLetter(true);
      toast.success("Thanks for signing up.");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("An error occurred.");
    }
  };
  return (
    <div className="flex w-full items-center justify-center bg-base-100 py-2">
      <div className="max-w-xl px-2">
        <form className="card-body" onSubmit={handleSubmit}>
          <h3 className="card-title text-3xl text-primary duration-200 hover:scale-105 lg:text-4xl">
            Become a member!
          </h3>
          <p className="text-neutral lg:text-lg">
            You'll receive all the latest news and information.
          </p>
          <div className="flex flex-col gap-2 py-2">
            <input
              type="text"
              required
              placeholder="First Name"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
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
              type="number"
              required
              placeholder="Student ID"
              className="input input-bordered w-full text-neutral focus:border-secondary"
              onChange={(e) => setStudentId(e.target.value.toString())}
              value={studentId}
            />
            <label className="label cursor-pointer">
              <span className="label-text">Newsletter Signup</span>
              <input
                type="checkbox"
                className="toggle"
                checked={newsLetter}
                onChange={(e) => setNewsLetter(e.target.checked)}
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
            }}/>
    </div>
  );
};

export default MemberSignup;
