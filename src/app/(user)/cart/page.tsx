
import React from "react";

import { fetchDiscountCodes} from "../../../Utils/api";
import CartDetails from "./CartDetails";

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




