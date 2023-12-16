import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import { deleteItem } from '~/redux/shopperSlice';
import db from '~/firebase';
import { collection, getDocs } from "firebase/firestore"; //
import { useRouter } from 'next/router';
import CtaForm from '~/components/CtaForm';
import BuyForm from '~/components/BuyForm';
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
  appliedToAll:boolean;
  id:string;
  discountAmount:number;
  code:string;
}

interface CartItem {
  product: Product;
  quantities: { S?: number; M?: number; L?: number; overall?: number };
}

const Cart = () => {
  const cartItems: CartItem[] = useSelector((state: any) => state.shopper.cart);
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState("");
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState("");
  const [discountCodes, setDiscountCodes] = useState<DiscountCodes[]>([]);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
    setCouponSuccess(''); 
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
      
      const discountCodeData = querySnapshot.docs.map(doc => doc.data() as DiscountCodes);
      console.log(discountCodeData)
      setDiscountCodes(discountCodeData);
    };
    fetchDiscountCodes();
    
    setSubtotal(price.toFixed(2));
    const total = price - discount; // Corrected calculation
    setTotal(total.toFixed(2));
  }, [cartItems, discount]);
  const applyCoupon = () => {
    let discount = 0;
    const discountCode = discountCodes.find(code => code.code === coupon);
    if (discountCode) {
      setCouponError('');
      if (discountCode.appliedToAll) {
        // Apply discount to all products
        cartItems.forEach((item: CartItem) => {
          if (item.product.hasSizes) {
            discount += (item.quantities.S || 0) * item.product.price * discountCode.discountAmount;
            discount += (item.quantities.M || 0) * item.product.price * discountCode.discountAmount;
            discount += (item.quantities.L || 0) * item.product.price * discountCode.discountAmount;
          } else {
            discount += (item.quantities.overall || 0) * item.product.price * discountCode.discountAmount;
          }
        });
      } else {
        // Apply discount to specific product
        cartItems.forEach((item: CartItem) => {
          if (item.product.id === discountCode.id) {
            if (item.product.hasSizes) {
              discount += (item.quantities.S || 0) * item.product.price * discountCode.discountAmount;
              discount += (item.quantities.M || 0) * item.product.price * discountCode.discountAmount;
              discount += (item.quantities.L || 0) * item.product.price * discountCode.discountAmount;
            } else {
              discount += (item.quantities.overall || 0) * item.product.price * discountCode.discountAmount;
            }
          }
        });
      }
      setCouponError(''); 
      setCouponSuccess('Coupon Applied');
    }else{
      setCouponError('Invalid coupon'); 
      setCouponSuccess('');
    }
    console.log('Total discount:', discount); // Debugging line
    setDiscount(discount);
  };
  const handleRemove = (productId: string, size?: keyof Product['sizes']) => {
    dispatch(deleteItem({ productId, size: size as keyof Product['sizes'] }));
  }
 

  return (
    <div>
        <Navbar/>
        <div className="bg-base-100 py-8 h-fit">
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                    <thead>
                    <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-left font-semibold">Total</th>
                        <th className="text-left font-semibold">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.flatMap((item: CartItem) =>
                        Object.entries(item.quantities)
                        .filter(([size, qty]) => qty )
                        .map(([size, qty]) => (
                            <tr key={item.product.id + size}>
                            <td className="py-4">
                                <div className="flex items-center">
                                <Link href={`products/${item.product.id}`}>
                                    <img className="h-16 w-16 mr-4" src={item.product.image} alt="Product image" />
                                    
                                    <span className="font-semibold">{item.product.name} ({size})</span>
                                </Link>
                                </div>
                            </td>
                            <td className="py-4">${item.product.price.toFixed(2)}</td>
                            <td className="py-4">{qty}</td>
                            <td className="py-4">${(item.product.price * qty).toFixed(2)}</td>
                            <td className="py-4">
                            <button 
                                className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
                                onClick={() => handleRemove(item.product.id, size as keyof Product['sizes'])}
                                >
                                Remove
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
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder="Enter coupon code"
                  className='bg-base-100 text-neutral'
                />
                <button onClick={applyCoupon}>Apply Coupon</button>
              </div>
              {couponError && <p className="text-red-500">{couponError}</p>} 
              {couponSuccess && <p className="text-green-500">{couponSuccess}</p>}
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Discount</span>
                  <span className="font-semibold">${(Number(subtotal) - Number(total)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total}</span>
                </div>
                
                <button 
                  className="bg-primary text-secondary py-2 px-4 rounded-lg mt-4 w-full" 
                  onClick={() => {
                    const modal = document.getElementById('my_modal_1');
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </button>
                      </form>
                    </div>
                    <BuyForm 
                        products={cartItems.flatMap(item => {
                            if (item.product.hasSizes) {
                                return Object.entries(item.quantities).map(([size, quantity]) => ({
                                    id: item.product.id,
                                    name: item.product.name,
                                    quantity: quantity || 0,
                                    size: size,
                                    hasSizes: item.product.hasSizes
                                }));
                            } else {
                                return [{
                                    id: item.product.id,
                                    name: item.product.name,
                                    quantity: item.quantities.overall || 0,
                                    size: 'N/A', // Or whatever you use to signify no size
                                    hasSizes: item.product.hasSizes
                                }];
                            }
                        }).filter(item => item.quantity > 0)}
                        totalPrice={total}
                    />
                  </div>
                </dialog>
              </div>
            </div>
           
            </div>
        </div>
        </div>
        <Footer/>
    </div>
  );
};

export default Cart;
