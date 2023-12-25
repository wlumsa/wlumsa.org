import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { deleteItem } from "~/redux/shopperSlice";
import db from "~/firebase";
import { collection, getDocs } from "firebase/firestore"; //
import BuyForm from "~/components/BuyForm";
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number;
  sizes: { S?: number; M?: number; L?: number };
  tags: string[];
}
interface DiscountCodes {
  appliedToAll: boolean;
  id: string;
  discountAmount: number;
  code: string;
}

interface CartItem {
  product: Product;
  quantities: { S?: number; M?: number; L?: number; overall?: number };
}

const Cart = () => {
  const cartItems: CartItem[] = useSelector((state: any) => state.shopper.cart);
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState("");
  const [discountCodes, setDiscountCodes] = useState<DiscountCodes[]>([]);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
    setCouponSuccess("");
  };

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item: CartItem) => {
      if (item.product.hasSizes) {
        price += (item.quantities.S || 0) * item.product.price;
        price += (item.quantities.M || 0) * item.product.price;
        price += (item.quantities.L || 0) * item.product.price;
      } else {
        price += (item.quantities.overall || 0) * item.product.price;
      }
    });
    const fetchDiscountCodes = async () => {
      const discountCodesCollection = collection(db, "DiscountCodes");
      const querySnapshot = await getDocs(discountCodesCollection);

      const discountCodeData = querySnapshot.docs.map(
        (doc) => doc.data() as DiscountCodes
      );
      console.log(discountCodeData);
      setDiscountCodes(discountCodeData);
    };
    fetchDiscountCodes();

    setSubtotal(price.toFixed(2));
    const total = price - discount; // Corrected calculation
    setTotal(total.toFixed(2));
  }, [cartItems, discount]);
  const applyCoupon = () => {
    let discount = 0;
    const discountCode = discountCodes.find((code) => code.code === coupon);
    if (discountCode) {
      setCouponError("");
      if (discountCode.appliedToAll) {
        // Apply discount to all products
        cartItems.forEach((item: CartItem) => {
          if (item.product.hasSizes) {
            discount +=
              (item.quantities.S || 0) *
              item.product.price *
              discountCode.discountAmount;
            discount +=
              (item.quantities.M || 0) *
              item.product.price *
              discountCode.discountAmount;
            discount +=
              (item.quantities.L || 0) *
              item.product.price *
              discountCode.discountAmount;
          } else {
            discount +=
              (item.quantities.overall || 0) *
              item.product.price *
              discountCode.discountAmount;
          }
        });
      } else {
        // Apply discount to specific product
        cartItems.forEach((item: CartItem) => {
          if (item.product.id === discountCode.id) {
            if (item.product.hasSizes) {
              discount +=
                (item.quantities.S || 0) *
                item.product.price *
                discountCode.discountAmount;
              discount +=
                (item.quantities.M || 0) *
                item.product.price *
                discountCode.discountAmount;
              discount +=
                (item.quantities.L || 0) *
                item.product.price *
                discountCode.discountAmount;
            } else {
              discount +=
                (item.quantities.overall || 0) *
                item.product.price *
                discountCode.discountAmount;
            }
          }
        });
      }
      setCouponError("");
      setCouponSuccess("Coupon Applied");
    } else {
      setCouponError("Invalid coupon");
      setCouponSuccess("");
    }
    console.log("Total discount:", discount); // Debugging line
    setDiscount(discount);
  };
  const handleRemove = (productId: string, size?: keyof Product["sizes"]) => {
    dispatch(deleteItem({ productId, size: size as keyof Product["sizes"] }));
  };

  return (
    <div>
      <Navbar />
      <div className="h-fit bg-base-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-3/4">
              <div className="table-xs mb-4 rounded-lg bg-white p-6 shadow-md">
                <table className="w-full ">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>

                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                      <th className="text-left font-semibold">Remove Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.flatMap((item: CartItem) =>
                      Object.entries(item.quantities)
                        .filter(([size, qty]) => qty)
                        .map(([size, qty]) => (
                          <tr key={item.product.id + size}>
                            <td className="py-4">
                              <div className="flex items-center">
                                <Link href={`products/${item.product.id}`}>
                                  <img
                                    className="mr-4 h-16 w-16"
                                    src={item.product.image}
                                    alt="Product image"
                                  />

                                  <span className="font-semibold">
                                    {item.product.name} ({size})
                                  </span>
                                </Link>
                              </div>
                            </td>

                            <td className="py-4">{qty}</td>
                            <td className="py-4">
                              ${(item.product.price * qty).toFixed(2)}
                            </td>
                            <td className="py-4 hover:text-red-600">
                              <button
                                className="mt-4 rounded-md "
                                onClick={() =>
                                  handleRemove(
                                    item.product.id,
                                    size as keyof Product["sizes"]
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-4 w-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Summary</h2>
                <div className="mb-2 flex justify-between ">
                  <input
                    type="text"
                    value={coupon}
                    onChange={handleCouponChange}
                    placeholder="Enter coupon code"
                    className="w-1/2 bg-base-100 text-neutral "
                  />
                  <button className=" justify-self-end" onClick={applyCoupon}>
                    Apply Coupon
                  </button>
                </div>
                {couponError && <p className="text-red-500">{couponError}</p>}
                {couponSuccess && (
                  <p className="text-green-500">{couponSuccess}</p>
                )}
                <hr className="my-2" />
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold">Discount</span>
                  <span className="font-semibold">
                    ${(Number(subtotal) - Number(total)).toFixed(2)}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total}</span>
                </div>

                <button
                  className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-secondary"
                  onClick={() => {
                    const modal = document.getElementById("my_modal_1");
                    if (modal instanceof HTMLDialogElement) {
                      modal.showModal();
                    }
                  }}
                >
                  Checkout
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="px-4">
                          <svg
                            className="h-3aa w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                        </button>
                      </form>
                    </div>
                    <BuyForm
                      products={cartItems
                        .flatMap((item) => {
                          if (item.product.hasSizes) {
                            return Object.entries(item.quantities).map(
                              ([size, quantity]) => ({
                                id: item.product.id,
                                name: item.product.name,
                                quantity: quantity || 0,
                                size: size,
                                hasSizes: item.product.hasSizes,
                              })
                            );
                          } else {
                            return [
                              {
                                id: item.product.id,
                                name: item.product.name,
                                quantity: item.quantities.overall || 0,
                                size: "N/A", // Or whatever you use to signify no size
                                hasSizes: item.product.hasSizes,
                              },
                            ];
                          }
                        })
                        .filter((item) => item.quantity > 0)}
                      totalPrice={total}
                    />
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
