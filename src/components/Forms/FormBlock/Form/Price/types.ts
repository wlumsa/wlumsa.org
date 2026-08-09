import type { BlockConfig } from "@payloadcms/plugin-form-builder/types";

interface PriceCondition {
  itemCount: number;
  price: number;
}

export interface PriceField extends BlockConfig {
  blockType: "price";
  name: string;
  label: string;
  width?: number;
  basePrice: number;
  arrayField: string;
  priceConditions: PriceCondition[];
}
