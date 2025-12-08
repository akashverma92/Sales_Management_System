"use client";

import RefreshIcon from "./RefreshIcon";
import CustomerRegion from "./CustomerRegion";
import Gender from "./Gender";
import AgeRange from "./AgeRange";
import ProductCategory from "./ProductCategory";
import Tags from "./Tags";
import PaymentMethod from "./PaymentMethod";
import DateRange from "./DateRange";
import SortByName from "./SortByName";

export default function FilterOptions() {
  return (
    <div className="w-full bg-white shadow-sm rounded-lg px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap">

      <RefreshIcon />
      <CustomerRegion />
      <Gender />
      <AgeRange />
      <ProductCategory />
      <Tags />
      <PaymentMethod />
      <DateRange />
      <SortByName />  

    </div>
  );
}
