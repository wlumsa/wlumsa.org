import React, { useEffect, useState } from "react";

import { GetStaticProps } from "next";
import Products from "../../components/UI/ProductCard"
import { NextPage } from "next";
import {
  getProductsData,
  getFooterData,
  getNavbarData,
  fetchSocialLinks,
} from "../../Utils/api"

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
interface ProductsPageProps {
  products: Product[];
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const socialLinks = await fetchSocialLinks();
    const navbarData = await getNavbarData();
    const footerData = await getFooterData();
    const products = await getProductsData();
    return {
      props: {
        socialLinks,
        navbarData,
        footerData,
        products,
      },
      revalidate: 43200, // or however many seconds you prefer
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        socialLinks: [],
        navbarData: [],
        footerdata: [],
      },
    };
  }
};

const ProductsPage: NextPage<ProductsPageProps> = ({
  socialLinks,
  navbarData, // Add this line
  footerData,
  products,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
    
      <div className="mb-28 mt-28 flex-grow px-4 md:px-10">
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

    </div>
  );
};
export default ProductsPage