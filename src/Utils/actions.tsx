'use server'
import {
  updateDoc,
  doc,
  increment,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";

import db from "@/firebase";

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

export async function verifyQuantities(products: Product[]): Promise<boolean> {
  for (const product of products) {
    const productRef = doc(db, "Products", product.id);
    const productSnapshot = await getDoc(productRef);
    const productData = productSnapshot.data();

    if (product.hasSizes) {
      const sizeQuantity = productData?.sizes[product.size];
      if (sizeQuantity && sizeQuantity < product.quantity) {
        return false;
      }
    } else {
      const quantity = productData?.quantity;
      if (quantity && quantity < product.quantity) {
        return false;
      }
    }
  }
  return true;
}
export async function handleQuantityUpdate(products: Product[]) {

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
  } catch (error) {
   
    alert(
      "An error has occurred, please contact msa@wlu.ca if you have already paid"
    );
  }
}




  export async function handleOrders(fullName: string, phoneNumber: string, email: string, imageUrl: string, totalPrice: string, pickupTime: string, products: Product[], password: string, customTime: string) {
  try {
    
    await addDoc(collection(db, "Orders"), {
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

    return imageUrl

  } catch (error) {
    
    alert(
      "An error has occurred, please contact msa@wlu.ca if you have already paid"
    );
  }
}

