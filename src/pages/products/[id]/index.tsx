import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "~/firebase";
import BuyForm from "~/components/BuyForm";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { addToCart } from "~/redux/shopperSlice";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import toast, { Toaster } from "react-hot-toast";
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

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(0); // Added overall quantity state
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id === "string") {
        try {
          const docRef = doc(db, "Products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const productData = {
              id: docSnap.id,
              ...docSnap.data(),
            } as Product;
            setProduct(productData);
            const storage = getStorage();
            const imageRef = ref(storage, productData.image);
            try {
              const url = await getDownloadURL(imageRef);
              setImageUrl(url);
            } catch (error) {
              setImageUrl("");
            }
          }
        } catch (error) {}
      }
    };
    fetchProduct();
  }, [id]);

  const handleSizeQuantityChange = (
    size: "S" | "M" | "L",
    newQuantity: number
  ) => {
    if (product) {
      const availableQuantity = product.sizes[size];
      const limitedQuantity = Math.max(0, Math.min(newQuantity, 1));
      //const limitedQuantity = Math.max(0, Math.min(newQuantity, availableQuantity)); // uncomment this line to let limit be the product quantity
      switch (size) {
        case "S":
          setQuantityS(limitedQuantity);
          break;
        case "M":
          setQuantityM(limitedQuantity);
          break;
        case "L":
          setQuantityL(limitedQuantity);
          break;
        default:
          break;
      }
    }
  };
  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
      const availableQuantity = product.quantity;
      //setQuantity(Math.max(0, Math.min(newQuantity, availableQuantity))); uncomment this line to let limit be the product quantity
      setQuantity(Math.max(0, Math.min(newQuantity, 1)));
    }
  };

  type SizeKey = "S" | "M" | "L";
  const sizeNames: Record<SizeKey, string> = {
    S: "Small",
    M: "Medium",
    L: "Large",
  };

  const renderQuantityInputs = () => {
    if (product?.hasSizes && product.sizes) {
      const allSizesOutOfStock =
        product.sizes.S === 0 && product.sizes.M === 0 && product.sizes.L === 0;
      if (allSizesOutOfStock) {
        return <div className="mt-2 text-lg text-red-500">Out of Stock</div>;
      } else {
        return Object.entries(product.sizes).map(([size, qty]) => (
          <div key={size} className="mt-2">
            <span>{sizeNames[size as SizeKey]}:</span>
            <div className="mt-2 flex items-center">
              <button
                type="button"
                onClick={() =>
                  handleSizeQuantityChange(
                    size as "S" | "M" | "L",
                    (size === "S"
                      ? quantityS
                      : size === "M"
                      ? quantityM
                      : quantityL) - 1
                  )
                }
                className="h-10 w-10 text-neutral transition hover:opacity-75"
                disabled={
                  (size === "S"
                    ? quantityS
                    : size === "M"
                    ? quantityM
                    : quantityL) <= 0
                }
              >
                -
              </button>
              <input
                type="number"
                value={
                  size === "S"
                    ? quantityS
                    : size === "M"
                    ? quantityM
                    : quantityL
                }
                onChange={(e) =>
                  handleSizeQuantityChange(
                    size as "S" | "M" | "L",
                    parseInt(e.target.value)
                  )
                }
                className="h-10 w-16 border-gray-200 bg-white text-center"
                min="0"
                max={qty}
              />
              <button
                type="button"
                onClick={() =>
                  handleSizeQuantityChange(
                    size as "S" | "M" | "L",
                    (size === "S"
                      ? quantityS
                      : size === "M"
                      ? quantityM
                      : quantityL) + 1
                  )
                }
                className="h-10 w-10 text-neutral transition hover:opacity-75"
                disabled={
                  (size === "S"
                    ? quantityS
                    : size === "M"
                    ? quantityM
                    : quantityL) >= qty
                }
              >
                +
              </button>
            </div>
          </div>
        ));
      }
    } else if (product && product.quantity > 0) {
      return (
        <div className="mt-2 flex items-center">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            className="h-10 w-10 text-neutral transition hover:opacity-75"
            disabled={quantity <= 0}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="h-10 w-16 border-gray-200 bg-white text-center"
            min="0"
            max={1}
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="h-10 w-10 text-neutral transition hover:opacity-75"
            disabled={quantity >= 1}
          >
            +
          </button>
        </div>
      );
    } else {
      return <div className="mt-2 text-lg text-red-500">Out of Stock</div>;
    }
  };
  let cartItems = [];
  if (product) {
    if (product.hasSizes) {
      cartItems.push({
        product: product,
        quantities: { S: quantityS, M: quantityM, L: quantityL },
      });
    } else {
      cartItems.push({
        product: product,
        quantities: { overall: quantity },
      });
    }
  }
  let totalPrice = 0;
  if (product) {
    if (product.hasSizes) {
      totalPrice += product.price * (quantityS + quantityM + quantityL);
    } else {
      totalPrice += product.price * quantity;
    }
  }

  const dispatch = useDispatch();
  return (
    <div className="py-10">
      <Navbar />
      {product ? (
        <div className="mb-20 mt-20 bg-base-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 flex flex-col md:flex-row">
              <div className="px-4 md:flex-1">
                <div className="mb-4 h-[460px] shadow-lg">
                  <img
                    className="h-full w-full rounded-lg object-cover"
                    src={imageUrl}
                    alt="Product Image"
                  />
                </div>
              </div>
              <div className="px-4 md:flex-1">
                <h2 className="mb-2 text-3xl font-bold text-neutral">
                  {product.name}
                </h2>
                <div className="mb-4 flex">
                  <div className="mr-4">
                    <span className="text-xl font-bold text-neutral">
                      Price:
                    </span>
                    <span className="text-lg text-neutral">
                      {" "}
                      ${product.price}{" "}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-xl font-bold text-neutral">
                    Select Quantity
                  </span>
                  <div className="flex w-fit flex-col md:flex-row md:gap-10">
                    {renderQuantityInputs()}
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold text-neutral">
                    Product Description:
                  </span>
                  <p className="mt-2 text-lg text-neutral">
                    {product.description}
                  </p>
                </div>
                <div className="-mx-2 mb-4 flex flex-col gap-2 py-10 md:flex-row">
                  <div className="w-full px-2 ">
                    <button
                      onClick={() => {
                        if (
                          (product.hasSizes &&
                            quantityS === 0 &&
                            quantityM === 0 &&
                            quantityL === 0) ||
                          (!product.hasSizes && quantity === 0)
                        ) {
                          alert(
                            "Please select a quantity before adding to cart."
                          );
                        } else {
                          dispatch(
                            addToCart({
                              product: {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                description: product.description,
                                image: imageUrl,
                                hasSizes: product.hasSizes,
                                quantity: product.quantity,
                                sizes: product.sizes,
                                tags: product.tags,
                              },
                              quantities: product.hasSizes
                                ? { S: quantityS, M: quantityM, L: quantityL }
                                : { overall: quantity },
                            })
                          ) && toast.success("Added to Cart");
                        }
                      }}
                      className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-secondary "
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-full px-2">
                    <button
                      className="mt-4 w-full rounded-lg bg-secondary px-4 py-2 text-primary  "
                      onClick={() => {
                        const modal = document.getElementById("my_modal_1");
                        if (modal instanceof HTMLDialogElement) {
                          modal.showModal();
                        }
                      }}
                    >
                      Buy Now
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="px-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
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
                          totalPrice={totalPrice.toString()}
                        />
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <Toaster
            reverseOrder={false}
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "white",
              },
            }}
          />
        </div>
      ) : (
        <div>Error loading product</div>
      )}
    </div>
  );
}
