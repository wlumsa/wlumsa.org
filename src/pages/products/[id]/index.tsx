import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '~/firebase';

import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/redux/shopperSlice';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import toast, { Toaster } from 'react-hot-toast';
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number;
  sizes: { S: number; M: number; L: number; };
  tags: string[];
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(0); // Added overall quantity state
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);
  const [isProductAdded, setIsProductAdded] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id === 'string') {
        try {
          const docRef = doc(db, 'Products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const productData = {
              id: docSnap.id,
              ...docSnap.data()
            } as Product;
            setProduct(productData);
            const storage = getStorage();
            const imageRef = ref(storage, productData.image);
            try {
              const url = await getDownloadURL(imageRef);
              setImageUrl(url);
            } catch (error) {
              setImageUrl('');
            }
          }
        } catch (error) {}
      }
    };
    fetchProduct();
  }, [id]);

  const handleSizeQuantityChange = (size: 'S' | 'M' | 'L', newQuantity: number) => {
    const limitedQuantity = Math.max(0, Math.min(newQuantity, 1)); // Limit quantity between 0 and 1
    switch (size) {
      case 'S':
        setQuantityS(limitedQuantity);
        break;
      case 'M':
        setQuantityM(limitedQuantity);
        break;
      case 'L':
        setQuantityL(limitedQuantity);
        break;
      default:
        break;
    }
  };
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(0, Math.min(newQuantity, 1))); // Limit quantity between 0 and 1
  };

  type SizeKey = 'S' | 'M' | 'L';
const sizeNames: Record<SizeKey, string> = { 'S': 'Small', 'M': 'Medium', 'L': 'Large' };

  const renderQuantityInputs = () => {
    if (product?.hasSizes && product.sizes) {
      const allSizesOutOfStock = product.sizes.S === 0 && product.sizes.M === 0 && product.sizes.L === 0;
      if (allSizesOutOfStock) {
        return <div className="text-red-500 text-lg mt-2">Out of Stock</div>;
      } else {
        return Object.entries(product.sizes).map(([size, qty]) => (
          <div key={size} className="mt-2">
            <span>{sizeNames[size as SizeKey]}:</span>
            <div className="flex items-center mt-2">
              <button type="button" onClick={() => handleSizeQuantityChange(size as 'S' | 'M' | 'L', (size === 'S' ? quantityS : size === 'M' ? quantityM : quantityL) - 1)} className="h-10 w-10 text-neutral transition hover:opacity-75" disabled={(size === 'S' ? quantityS : size === 'M' ? quantityM : quantityL) <= 0}>-</button>
              <input type="number" value={size === 'S' ? quantityS : size === 'M' ? quantityM : quantityL} onChange={(e) => handleSizeQuantityChange(size as 'S' | 'M' | 'L', parseInt(e.target.value))} className="h-10 w-16 text-center border-gray-200 bg-white" min="0" max={qty} />
              <button type="button" onClick={() => handleSizeQuantityChange(size as 'S' | 'M' | 'L', (size === 'S' ? quantityS : size === 'M' ? quantityM : quantityL) + 1)} className="h-10 w-10 text-neutral transition hover:opacity-75" disabled={(size === 'S' ? quantityS : size === 'M' ? quantityM : quantityL) >= qty}>+</button>
            </div>
          </div>
        ));
      }
    } else if (product && product.quantity > 0) {
      return (
        <div className="flex items-center mt-2">
          <button type="button" onClick={() => handleQuantityChange(quantity - 1)} className="h-10 w-10 text-neutral transition hover:opacity-75" disabled={quantity <= 0}>-</button>
          <input type="number" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value))} className="h-10 w-16 text-center border-gray-200 bg-white" min="0" max={1} />
          <button type="button" onClick={() => handleQuantityChange(quantity + 1)} className="h-10 w-10 text-neutral transition hover:opacity-75" disabled={quantity >= 1}>+</button>
        </div>
      );
    } else {
      return <div className="text-red-500 text-lg mt-2">Out of Stock</div>;
    }
  };
  
  const dispatch = useDispatch()
  return (
    <div className='py-10'>
     <Navbar/>
      {product ? (
        <div className="bg-base-100 mt-20 mb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] shadow-lg mb-4">
                  <img className="w-full h-full object-cover rounded-lg" src={imageUrl} alt="Product Image"/>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-3xl font-bold text-neutral mb-2">{product.name}</h2>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-neutral text-xl">Price:</span>
                    <span className="text-neutral text-lg"> ${product.price} </span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-neutral text-xl">Select Quantity</span>
                  <div className='flex flex-col md:flex-row md:gap-10 w-fit'>
                  {renderQuantityInputs()}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-neutral text-xl">Product Description:</span>
                  <p className="text-neutral text-lg mt-2">{product.description}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 -mx-2 mb-4 py-10">
                    <div className="w-full px-2 ">
                      <button onClick={() => {
                        if ((product.hasSizes && quantityS === 0 && quantityM === 0 && quantityL === 0) || (!product.hasSizes && quantity === 0)) {
                          alert('Please select a quantity before adding to cart.');
                        } else {
                          dispatch(addToCart({
                            product: {
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              description: product.description,
                              image: imageUrl,
                              hasSizes: product.hasSizes,
                              quantity: product.quantity,
                              sizes: product.sizes,
                              tags: product.tags
                            },
                            quantities: product.hasSizes ? { S: quantityS, M: quantityM, L: quantityL } : { overall: quantity }
                          })
                          
                          ) && toast.success('Added to Cart')
          
                        }
                      }} className="bg-primary text-secondary py-2 px-4 rounded-lg mt-4 w-full ">Add to Cart</button>
                      
                    </div>
                    <div className="w-full px-2">
                        <button className="bg-secondary text-primary py-2 px-4 rounded-lg mt-4 w-full  ">Buy Now</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <Toaster
            reverseOrder = {false}
            position='top-center'
            toastOptions={{
              style:{
                borderRadius:"8px",
                background:"#333",
                color:"white"
              }
            }}
          
          />
        </div>
      ) : (
        <div>Error loading product</div>
      )}
      <Footer/>
    </div>
  );
}
