import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "~/firebase";

import Products from "~/components/ProductCard";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number;
  sizes: { S: number; M: number; L: number };
  tags: string[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const productsCollectionRef = collection(db, "Products");
      const querySnapshot = await getDocs(productsCollectionRef);

      const productsData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Product;
        return { ...data, id: doc.id };
      });
      setProducts(productsData);
    };

    fetchAndSetProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mb-28 mt-28 px-4 md:px-10">
        <section className="mx-auto w-fit ">
          <h2 className="text-4xl font-bold text-primary">Merchandise</h2>
          <div className="mb-5 mt-10 grid grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
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
      <Footer />
    </div>
  );
};

export default ProductsPage;
