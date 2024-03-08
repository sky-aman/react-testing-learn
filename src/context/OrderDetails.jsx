import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "userOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

const initialState = {
  scoops: {}, // example: {chocolate: 1, vanilla: 2}
  toppings: {},
};
export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState(initialState);

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ ...initialState });
  }

  //   utility function to derive totals from optionCounts state value
  function calculateTotal(optionType) {
    // get an array of counts for the optionTypes
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // multiple the total number of items
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
