import React from "react";

import Products from "../../../components/UI/ProductCard";

import { getProductsData } from "../../../Utils/datafetcher";


export default async function ProductsPage() {
  const products = await getProductsData();

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
}
