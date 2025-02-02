// "use client"
// import { useParams } from 'next/navigation'
// import { useEffect, useState } from "react";
// import { fetchProduct } from '@/utils/datafetcher';
// import BuyForm from "@/components/Forms/BuyForm";

// import { useDispatch } from "react-redux";
// import { addToCart } from "@/redux/shopperSlice";

// import toast, { Toaster } from "react-hot-toast";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   hasSizes: boolean;
//   quantity: number;
//   sizes: { S: number; M: number; L: number };
//   tags: string[];
// }


// interface Props {
//   product: Product;
//   imageUrl: string;
// }

// /**
//  * Component for displaying a product and managing its quantity.
//  */
// const ProductDisplay: React.FC<Props> = ({ product, imageUrl }) => {
//   // State for overall quantity and size-specific quantities
//   const [quantity, setQuantity] = useState(0);
//   const [quantityS, setQuantityS] = useState(0);
//   const [quantityM, setQuantityM] = useState(0);
//   const [quantityL, setQuantityL] = useState(0);

//   /**
//    * Handles the change in quantity for a specific size.
//    * @param size - The size of the product (S, M, L).
//    * @param newQuantity - The new quantity value.
//    */
//   const handleSizeQuantityChange = (
//     size: "S" | "M" | "L",
//     newQuantity: number
//   ) => {
//     if (product) {
//       const availableQuantity = product.sizes[size];
//       const limitedQuantity = Math.max(0, Math.min(newQuantity, 3));
//       switch (size) {
//         case "S":
//           setQuantityS(limitedQuantity);
//           break;
//         case "M":
//           setQuantityM(limitedQuantity);
//           break;
//         case "L":
//           setQuantityL(limitedQuantity);
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   /**
//    * Handles the change in overall quantity.
//    * @param newQuantity - The new quantity value.
//    */
//   const handleQuantityChange = (newQuantity: number) => {
//     if (product) {
//       const availableQuantity = product.quantity;
//       setQuantity(Math.max(0, Math.min(newQuantity, 3)));
//     }
//   };

//   // Object mapping size keys to size names
//   type SizeKey = "S" | "M" | "L";
//   const sizeNames: Record<SizeKey, string> = {
//     S: "Small",
//     M: "Medium",
//     L: "Large",
//   };

//   /**
//    * Renders the quantity inputs based on the product's availability and size options.
//    * @returns The JSX elements for the quantity inputs.
//    */
//   const renderQuantityInputs = () => {
//     if (product?.hasSizes && product.sizes) {
//       const allSizesOutOfStock =
//         product.sizes.S === 0 && product.sizes.M === 0 && product.sizes.L === 0;
//       if (allSizesOutOfStock) {
//         return <div className="mt-2 text-lg text-red-500">Out of Stock</div>;
//       } else {
//         return Object.entries(product.sizes).map(([size, qty]) => (
//           <div key={size} className="mt-2">
//             <span>{sizeNames[size as SizeKey]}:</span>
//             <div className="mt-2 flex items-center">
//               {/* Decrease quantity button */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   handleSizeQuantityChange(
//                     size as "S" | "M" | "L",
//                     (size === "S"
//                       ? quantityS
//                       : size === "M"
//                       ? quantityM
//                       : quantityL) - 1
//                   )
//                 }
//                 className="h-10 w-10 text-neutral transition hover:opacity-75"
//                 disabled={
//                   (size === "S"
//                     ? quantityS
//                     : size === "M"
//                     ? quantityM
//                     : quantityL) <= 0
//                 }
//               >
//                 -
//               </button>
//               {/* Quantity input */}
//               <input
//                 type="number"
//                 value={
//                   size === "S"
//                     ? quantityS
//                     : size === "M"
//                     ? quantityM
//                     : quantityL
//                 }
//                 onChange={(e) =>
//                   handleSizeQuantityChange(
//                     size as "S" | "M" | "L",
//                     parseInt(e.target.value)
//                   )
//                 }
//                 className="h-10 w-16 border-gray-200 bg-base-100 text-center"
//                 min="0"
//                 max={qty}
//               />
//               {/* Increase quantity button */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   handleSizeQuantityChange(
//                     size as "S" | "M" | "L",
//                     (size === "S"
//                       ? quantityS
//                       : size === "M"
//                       ? quantityM
//                       : quantityL) + 1
//                   )
//                 }
//                 className="h-10 w-10 text-neutral transition hover:opacity-75"
//                 disabled={
//                   (size === "S"
//                     ? quantityS
//                     : size === "M"
//                     ? quantityM
//                     : quantityL) >= qty
//                 }
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ));
//       }
//     } else if (product && product.quantity > 0) {
//       return (
//         <div className="mt-2 flex items-center">
//           {/* Decrease quantity button */}
//           <button
//             type="button"
//             onClick={() => handleQuantityChange(quantity - 1)}
//             className="h-10 w-10 text-neutral transition hover:opacity-75"
//             disabled={quantity <= 0}
//           >
//             -
//           </button>
//           {/* Quantity input */}
//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
//             className="h-10 w-16 border-gray-200 bg-base-100 text-center"
//             min="0"
//             max={product.quantity}
//           />
//           {/* Increase quantity button */}
//           <button
//             type="button"
//             onClick={() => handleQuantityChange(quantity + 1)}
//             className="h-10 w-10 text-neutral transition hover:opacity-75"
//             disabled={quantity >= product.quantity}
//           >
//             +
//           </button>
//         </div>
//       );
//     } else {
//       return <div className="mt-2 text-lg text-red-500">Out of Stock</div>;
//     }
//   };

//   // Array to store cart items
//   let cartItems = [];
//   if (product) {
//     if (product.hasSizes) {
//       cartItems.push({
//         product: product,
//         quantities: { S: quantityS, M: quantityM, L: quantityL },
//       });
//     } else {
//       cartItems.push({
//         product: product,
//         quantities: { overall: quantity },
//       });
//     }
//   }

//   // Calculate total price
//   let totalPrice = 0;
//   if (product) {
//     if (product.hasSizes) {
//       totalPrice += product.price * (quantityS + quantityM + quantityL);
//     } else {
//       totalPrice += product.price * quantity;
//     }
//   }

//   const dispatch = useDispatch();

//   return (
//     <div className="flex min-h-screen flex-col py-10">
//       <div className="flex-grow">
//         {product ? (
//           <div className="mb-20 mt-20 bg-base-100">
//             <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//               <div className="-mx-4 flex flex-col md:flex-row">
//                 <div className="px-4 md:flex-1">
//                   <div className="mb-4 h-[460px] shadow-lg">
//                     {/* Product image */}
//                     <img
//                       className="h-full w-full rounded-lg object-cover"
//                       src={imageUrl}
//                       alt="Product Image"
//                     />
//                   </div>
//                 </div>
//                 <div className="px-4 md:flex-1">
//                   {/* Product name */}
//                   <h2 className="mb-2 text-3xl font-bold text-neutral">
//                     {product.name}
//                   </h2>
//                   <div className="mb-4 flex">
//                     <div className="mr-4">
//                       <span className="text-xl font-bold text-neutral">
//                         Price:
//                       </span>
//                       {/* Product price */}
//                       <span className="text-lg text-neutral">
//                         {" "}
//                         ${product.price}{" "}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <span className="text-xl font-bold text-neutral">
//                       Select Quantity
//                     </span>
//                     <div className="flex w-fit flex-col md:flex-row md:gap-10">
//                       {/* Render quantity inputs */}
//                       {renderQuantityInputs()}
//                     </div>
//                     <p>Limit of 3 items per customer</p>
//                   </div>
//                   <div>
//                     <span className="text-xl font-bold text-neutral">
//                       Product Description:
//                     </span>
//                     {/* Product description */}
//                     <p className="mt-2 text-lg text-neutral">
//                       {product.description}
//                     </p>
//                   </div>
//                   <div className="-mx-2 mb-4 flex flex-col gap-2 py-10 md:flex-row">
//                     <div className="w-full px-2 ">
//                       {/* Add to cart button */}
//                       <button
//                         onClick={() => {
//                           if (
//                             (product.hasSizes &&
//                               quantityS === 0 &&
//                               quantityM === 0 &&
//                               quantityL === 0) ||
//                             (!product.hasSizes && quantity === 0)
//                           ) {
//                             alert(
//                               "Please select a quantity before adding to cart."
//                             );
//                           } else {
//                             dispatch(
//                               addToCart({
//                                 product: {
//                                   id: product.id,
//                                   name: product.name,
//                                   price: product.price,
//                                   description: product.description,
//                                   image: imageUrl,
//                                   hasSizes: product.hasSizes,
//                                   quantity: product.quantity,
//                                   sizes: product.sizes,
//                                   tags: product.tags,
//                                 },
//                                 quantities: product.hasSizes
//                                   ? { S: quantityS, M: quantityM, L: quantityL }
//                                   : { overall: quantity },
//                               })
//                             ) && toast.success("Added to Cart");
//                           }
//                         }}
//                         className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-secondary "
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                     <div className="w-full px-2">
//                       <button
//                         className="mt-4 w-full rounded-lg bg-secondary px-4 py-2 text-primary  "
//                         onClick={() => {
//                           const modal = document.getElementById("my_modal_1");
//                           if (modal instanceof HTMLDialogElement) {
//                             modal.showModal();
//                           }
//                         }}
//                       >
//                         Buy Now
//                       </button>
//                       <dialog id="my_modal_1" className="modal">
//                         <div className="modal-box">
//                           <div className="modal-action">
//                             <form method="dialog">
//                               <button className="px-4">
//                                 <svg
//                                   className="h-3aa w-3"
//                                   aria-hidden="true"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 14 14"
//                                 >
//                                   <path
//                                     stroke="currentColor"
//                                     stroke-linecap="round"
//                                     stroke-linejoin="round"
//                                     stroke-width="2"
//                                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                   />
//                                 </svg>
//                               </button>
//                             </form>
//                           </div>
//                           <BuyForm
//                             products={cartItems
//                               .flatMap((item) => {
//                                 if (item.product.hasSizes) {
//                                   return Object.entries(item.quantities).map(
//                                     ([size, quantity]) => ({
//                                       id: item.product.id,
//                                       name: item.product.name,
//                                       quantity: quantity || 0,
//                                       size: size,
//                                       hasSizes: item.product.hasSizes,
//                                     })
//                                   );
//                                 } else {
//                                   return [
//                                     {
//                                       id: item.product.id,
//                                       name: item.product.name,
//                                       quantity: item.quantities.overall || 0,
//                                       size: "N/A", // Or whatever you use to signify no size
//                                       hasSizes: item.product.hasSizes,
//                                     },
//                                   ];
//                                 }
//                               })
//                               .filter((item) => item.quantity > 0)}
//                             totalPrice={totalPrice.toString()}
//                           />
//                         </div>
//                       </dialog>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Toaster
//               reverseOrder={false}
//               position="top-center"
//               toastOptions={{
//                 style: {
//                   borderRadius: "8px",
//                   background: "#333",
//                   color: "white",
//                 },
//               }}
//             />
//           </div>
//         ) : (
//           <div>Error loading product</div>
//         )}
//       </div>
    
//     </div>
//   );
// };

// export default ProductDisplay
import React from 'react'

const ProductComponent = () => {
  return (
    <div>ProductComponent</div>
  )
}

export default ProductComponent