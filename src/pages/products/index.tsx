import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import db from '~/firebase';

import Products from '~/components/ProductCard';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
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

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const productsCollectionRef = collection(db, "Products");
      const querySnapshot = await getDocs(productsCollectionRef);
      
      const productsData = querySnapshot.docs.map(doc => {
        const data = doc.data() as Product;
        return { ...data, id: doc.id };
      });
      setProducts(productsData);
    };
    
    fetchAndSetProducts();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="mt-28 mb-28 px-4 md:px-10">
        
        <section className="w-fit mx-auto ">
          <h2 className="text-4xl font-bold text-primary">Merchandise</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
          {products.map(product => (
            
            <Products
            productId={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            tags={product.tags}
          />
            
          ))}
          </div>
        </section>
        
      </div>
      <Footer/>
    </div>
  );
};

export default ProductsPage;

