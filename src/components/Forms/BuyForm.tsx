// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import db from "@/firebase";

// import {
//   updateDoc,
//   doc,
//   increment,
//   collection,
//   addDoc,
//   getDoc,
// } from "firebase/firestore";
// import { useDispatch } from "react-redux";
// import { clearCart } from "@/redux/shopperSlice";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { handleOrders, handleQuantityUpdate, verifyQuantities } from "@/utils/actions";
// interface Product {
//   name: string;
//   id: string;
//   quantity: number;
//   size: string;
//   hasSizes: boolean;
// }

// interface BuyFormProps {
//   products: Product[];
//   totalPrice: string;
// }
// /**
//  * Represents a form for buying products.
//  * @param products - The list of products to buy.
//  * @param totalPrice - The total price of the products.
//  */

// const BuyForm: React.FC<BuyFormProps> = ({ products, totalPrice }) => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [pickupTime, setPickupTime] = useState<string>("");
//   const [customTime, setCustomTime] = useState<string>("");
//   const [image, setImage] = useState<File | null>(null);
//   const [areQuantitiesValid, setAreQuantitiesValid] = useState<boolean>(true);

//   const dispatch = useDispatch();

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const handlePickupTimeChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setPickupTime(event.target.value);
//   };

//   const handleCustomTimeChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setCustomTime(event.target.value);
//   };

//   useEffect(() => {
//     const checkQuantities = async () => {
//       const validQuantites = await verifyQuantities(products);
//       setAreQuantitiesValid(validQuantites);
//     };

//     checkQuantities();
//   }, [products]);

//   async function handleSubmit() {




//     try {
//       await handleQuantityUpdate(products)

//       dispatch(clearCart());

//       let imageUrl = "";
//       if (image) {
//         'use server'
//         imageUrl = await handleImage(image)
//       }
//       await handleOrders(fullName, phoneNumber, email, imageUrl, totalPrice, pickupTime, products, password, customTime)

//       const formData = {
//         Name: fullName,
//         email: email,
//         phoneNumber: phoneNumber,
//         password: password,
//         image: imageUrl,
//         price: totalPrice,
//         pickuptime: pickupTime === "Other" ? customTime : pickupTime,
//         products: products,
//       };

//       try {
//         await axios.post("/api/sendreceipt", formData);

//         setFullName("");
//         setEmail("");
//         setPhoneNumber("");
//         setPassword("");
//         setPickupTime("");
//         setCustomTime("");
//         setImage(null);
//       } catch (error) {
//         console.error("Error sending form: ", error);
//       }
//     } catch (error) {

//       alert(
//         "An error has occurred, please contact msa@wlu.ca if you have already paid"
//       );
//     }
//   };


//   if (!areQuantitiesValid) {
//     return (
//       <div>Some products have invalid quantities. Please update your cart.</div>
//     );
//   }
//   return (
//     <div>
//       <div className="flex items-center">
//         <div className="w-full rounded-xl px-2  md:w-[30rem]">
//           <form className="card-body" action={handleSubmit}>
//             <div className="flex flex-col gap-2 ">
//               <h1>E-Transfer ${totalPrice} to wlumsa.donate@gmail.com</h1>
//               <p>Please note all items are for pickup only!</p>
//               <input
//                 type="text"
//                 required
//                 placeholder="Full Name"
//                 className="input input-bordered w-full text-neutral focus:border-secondary"
//                 onChange={(e) => setFullName(e.target.value)}
//                 value={fullName}
//               />
//               <input
//                 type="tel"
//                 required
//                 pattern="[0-9]{10}"
//                 placeholder="Phone Number"
//                 className="input input-bordered w-full text-neutral focus:border-secondary"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 value={phoneNumber}
//               />

//               <input
//                 type="email"
//                 required
//                 placeholder="E-Transfer Email"
//                 className="input input-bordered w-full text-neutral focus:border-secondary"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//               <input
//                 type="password"
//                 required
//                 placeholder="E-Transfer Password"
//                 className="input input-bordered w-full text-neutral focus:border-secondary"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//               <label className="form-control w-full max-w-xs">
//                 <div className="label">
//                   <span className="label-text">Screenshot of E-Transfer</span>
//                 </div>
//                 <input
//                   type="file"
//                   className="file-input-s file-input-bordered w-full max-w-xs"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//               </label>
//               <select
//                 required
//                 className="input input-bordered w-full text-neutral focus:border-secondary"
//                 value={pickupTime}
//                 onChange={handlePickupTimeChange}
//               >
//                 <option disabled value="">
//                   Pickup Time
//                 </option>
//                 <option>Monday 1-4 PM</option>
//                 <option>Tuesday 1-4 PM</option>
//                 <option>Wednesday 1-4 PM</option>
//                 <option>Thursday 1-4 PM</option>
//                 <option>Other</option>
//               </select>
//               {pickupTime === "Other" && (
//                 <input
//                   type="text"
//                   className="input input-bordered w-full text-neutral focus:border-secondary"
//                   placeholder="Enter other time and we will get back to you"
//                   value={customTime}
//                   onChange={handleCustomTimeChange}
//                   required
//                 />
//               )}
//             </div>
//             <div className="card-actions justify-end">
//               <button type="submit" className="btn btn-secondary text-primary ">
//                 Submit ➜
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyForm;

// async function handleImage(image: File) {
//   let imageUrl = "";

//   const storage = getStorage();
//   const storageRef = ref(storage, `receipts/${image.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, image);

//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress =
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//     },
//     (error) => {
//       console.error("Error uploading image: ", error);
//     },
//     async () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(
//         async (downloadURL) => {
//           imageUrl = downloadURL;
//         }
//       );
//     }
//   );


//   return imageUrl
// }
import React from 'react'

const BuyForm = () => {
  return (
    <div>BuyForm</div>
  )
}

export default BuyForm