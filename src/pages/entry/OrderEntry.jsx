import { useEffect } from "react";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry() {
  const { totals, resetOrder } = useOrderDetails();

  useEffect(() => {
    return () => {
      resetOrder();
    };
  }, []);

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
}
