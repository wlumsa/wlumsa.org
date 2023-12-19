import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import { deleteItem } from '~/redux/shopperSlice';
import db from '~/firebase';
import { collection, getDocs } from "firebase/firestore"; //

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


const ProductCard = ({
  product,
  quantity,
  handleRemove,
}: {
  product: Product;
  quantity: { size: keyof Product['sizes']; qty: number };
  handleRemove: (productId: string, size: keyof Product['sizes']) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between">
        <Link href={`/products/${product.id}`}>
          <div className="flex items-center cursor-pointer">
            <img className="h-16 w-16 mr-4 rounded-md" src={product.image} alt={product.name} />
            <div>
              <span className="font-semibold">{product.name}</span>
              <p className="text-sm text-gray-600">Size: {quantity.size}</p>
            </div>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="mr-4"> {/* Wrapper added for price with right margin */}
            <span className="text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
          </div>
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={() => handleRemove(product.id, quantity.size)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};



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
          <h1 style={{ paddingTop: '80px', paddingBottom: '50px'}} className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              {cartItems.flatMap((item: CartItem) =>
                Object.entries(item.quantities)
                .filter(([size, qty]) => qty )
                .map(([size, qty]) => (
                  <ProductCard
                    key={item.product.id + size}
                    product={item.product}
                    quantity={{ size: size as keyof Product['sizes'], qty }}
                    handleRemove={handleRemove}
                  />
                ))
              )}
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="Enter coupon code"
                    className='bg-base-100 text-neutral p-2'
                  />
                  <button onClick={() => { /* Implement coupon application logic */ }}>
                    Apply Coupon
                  </button>
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
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total}</span>
                </div>
                
                <button 
                  className="bg-primary text-secondary py-2 px-4 rounded-lg mt-4 w-full" 
                  // Implement checkout logic here
                >
                  Checkout
                </button>
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
