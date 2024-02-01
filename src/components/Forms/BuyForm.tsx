"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import db from "@/firebase";

import {
  updateDoc,
  doc,
  increment,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/shopperSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
interface Product {
  name: string;
  id: string;
  quantity: number;
  size: string;
  hasSizes: boolean;
}

interface BuyFormProps {
  products: Product[];
  totalPrice: string;
}
const BuyForm: React.FC<BuyFormProps> = ({ products, totalPrice }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [pickupTime, setPickupTime] = useState<string>("");
  const [customTime, setCustomTime] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [areQuantitiesValid, setAreQuantitiesValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handlePickupTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPickupTime(event.target.value);
  };

  const handleCustomTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTime(event.target.value);
  };

  useEffect(() => {
    const verifyQuantities = async () => {
      for (const product of products) {
        const productRef = doc(db, "Products", product.id);
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();

        if (product.hasSizes) {
          const sizeQuantity = productData?.sizes[product.size];
          if (sizeQuantity && sizeQuantity < product.quantity) {
            setAreQuantitiesValid(false);
            break;
          }
        } else {
          const quantity = productData?.quantity;
          if (quantity && quantity < product.quantity) {
            setAreQuantitiesValid(false);
            break;
          }
        }
      }
    };

    verifyQuantities();
  }, [products]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      for (const product of products) {
        const productRef = doc(db, "Products", product.id);
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();

        if (product.hasSizes) {
          const sizeQuantity = productData?.sizes[product.size];
          if (sizeQuantity && sizeQuantity < product.quantity) {
            throw new Error("Invalid quantity");
          } else {
            await updateDoc(productRef, {
              [`sizes.${product.size}`]: increment(-product.quantity),
            });
          }
        } else {
          const quantity = productData?.quantity;
          if (quantity && quantity < product.quantity) {
            throw new Error("Invalid quantity");
          } else {
            await updateDoc(productRef, {
              quantity: increment(-product.quantity),
            });
          }
        }
      }

      dispatch(clearCart());

      let imageUrl = "";
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `receipts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                imageUrl = downloadURL;

                // Add a new document to Firestore
              }
            );
          }
        );
        
      }
      const docRef = await addDoc(collection(db, "Orders"), {
        Name: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        image: imageUrl,
        price: totalPrice,
        pickuptime: pickupTime === "Other" ? customTime : pickupTime,
        products: products,
        delivered: false,
      });
      
      const formData = {
        Name: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        image: imageUrl,
        price: totalPrice,
        pickuptime: pickupTime === "Other" ? customTime : pickupTime,
        products: products,
      };

      try {
        const response = await axios.post("/api/sendreceipt", formData);
        console.log(response.data);
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setPickupTime("");
        setCustomTime("");
        setImage(null);
      } catch (error) {
        console.error("Error sending form: ", error);
      }
    } catch (error) {
      console.log(error)
      alert(
        "An error has occurred, please contact msa@wlu.ca if you have already paid"
      );
    }
  };

  console.log(products);
  if (!areQuantitiesValid) {
    return (
      <div>Some products have invalid quantities. Please update your cart.</div>
    );
  }
  return (
    <div>
      <div className="flex items-center">
        <div className="w-full rounded-xl px-2  md:w-[30rem]">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 ">
              <h1>E-Transfer ${totalPrice} to msa@wlu.ca</h1>
              <p>Please note all items are for pickup only!</p>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
              <input
                type="tel"
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone Number"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />

              <input
                type="email"
                required
                placeholder="E-Transfer Email"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                required
                placeholder="E-Transfer Password"
                className="input input-bordered w-full text-neutral focus:border-secondary"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Screenshot of E-Transfer</span>
                </div>
                <input
                  type="file"
                  className="file-input-s file-input-bordered w-full max-w-xs"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <select
                required
                className="input input-bordered w-full text-neutral focus:border-secondary"
                value={pickupTime}
                onChange={handlePickupTimeChange}
              >
                <option disabled value="">
                  Pickup Time
                </option>
                <option>Monday 1-4 PM</option>
                <option>Tuesday 1-4 PM</option>
                <option>Wednesday 1-4 PM</option>
                <option>Thursday 1-4 PM</option>
                <option>Other</option>
              </select>
              {pickupTime === "Other" && (
                <input
                  type="text"
                  className="input input-bordered w-full text-neutral focus:border-secondary"
                  placeholder="Enter other time and we will get back to you"
                  value={customTime}
                  onChange={handleCustomTimeChange}
                  required
                />
              )}
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-secondary text-primary ">
                Submit ➜
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;
