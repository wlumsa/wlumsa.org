import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    hasSizes: boolean;
    quantity: number;
    selectedQuantity?: number; // Add this field
    sizes: { S: number; M: number; L: number; };
    tags: string[];
}


interface ShopperState {
    cart: { product: Product, quantities: { S?: number, M?: number, L?: number, overall?: number } }[];
   
    userInfo: null;
}

const initialState: ShopperState = {
    cart: [],
    userInfo: null,
}
export const shopperSlice = createSlice({
    name: "shopper",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product, quantities: { S?: number, M?: number, L?: number, overall?: number } }>) => {
            const { product, quantities } = action.payload;
            const existingProductIndex = state.cart.findIndex(cartItem => cartItem.product.id === product.id);

            if (existingProductIndex !== -1) {
                // If the product already exists in the cart, only update the quantities if they have changed
                const existingProduct = state.cart[existingProductIndex];
                if (existingProduct && existingProduct.quantities) {
                    if (quantities.S !== undefined && quantities.S !== existingProduct.quantities.S) existingProduct.quantities.S = quantities.S;
                    if (quantities.M !== undefined && quantities.M !== existingProduct.quantities.M) existingProduct.quantities.M = quantities.M;
                    if (quantities.L !== undefined && quantities.L !== existingProduct.quantities.L) existingProduct.quantities.L = quantities.L;
                    if (quantities.overall !== undefined && quantities.overall !== existingProduct.quantities.overall) existingProduct.quantities.overall = quantities.overall;
                }
            } else {
                
                state.cart.push({ product, quantities });
            }
        },
        deleteItem: (state, action: PayloadAction<{ productId: string; size: keyof Product['sizes'] }>) => {
            const { productId, size } = action.payload;
            const itemIndex = state.cart.findIndex((item) => item.product.id === productId);
          
            if (itemIndex !== -1) {
              const item = state.cart[itemIndex];
              if (item) {
                if (item.product.hasSizes) {
                  item.quantities[size] = 0;
                } else {
                  item.quantities.overall = 0;
                }
          
                // Check if all quantities are zero
                const allZero = Object.values(item.quantities).every((qty) => qty === 0);
                if (allZero) {
                  // Remove the item from the cart
                  state.cart.splice(itemIndex, 1);
                }
              }
            }
          },
    },
});
export const { addToCart,deleteItem } = shopperSlice.actions;
export default shopperSlice.reducer;