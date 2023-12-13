import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import { deleteItem } from '~/redux/shopperSlice';
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

interface CartItem {
  product: Product;
  quantities: { S?: number; M?: number; L?: number; overall?: number };
}

const Cart = () => {
  const cartItems: CartItem[] = useSelector((state: any) => state.shopper.cart);
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState("");

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
    setSubtotal(price.toFixed(2));
  }, [cartItems]);

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
                
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${subtotal}</span>
                </div>
                <button className="bg-primary text-secondary py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
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
