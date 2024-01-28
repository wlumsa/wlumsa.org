import { fetchProduct } from "@/Utils/api";

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

import ProductDisplay from "@/components/UI/ProductComponent";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { product, imageUrl } = await fetchProduct(id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="flex min-h-screen flex-col py-10">
      <ProductDisplay product={product} imageUrl={imageUrl} />
    </div>
  );
}
