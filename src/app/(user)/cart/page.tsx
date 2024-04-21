
import React from "react";

import { fetchDiscountCodes} from "../../../Utils/datafetcher";
import CartDetails from "../../../components/CartDetails";
export const revalidate = 86400
/**
 * Renders the Cart page component.
 * @returns The JSX element representing the Cart page.
 */
export default async function Cart() {
   const discountCodes = await fetchDiscountCodes();

  return (
    <div className="mt-20 flex min-h-screen flex-col">
        <div className="flex-grow">
      <CartDetails discountCodes={discountCodes} />
      </div>
    </div>
  );
};




