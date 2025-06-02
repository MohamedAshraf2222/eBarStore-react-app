import { useEffect } from "react";
import CartItems from "../../components/cart";
import Navbar from "../../components/navbar";
import { useDispatch } from "react-redux";
import { fetchCartIndex } from "../../slices/e-barStore/thunk";
import OrderSummary from "../../components/cart/OrderSummary";
const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchCartIndex());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar title="Shopping Cart" backButton={true} showCart={false} />
      <h2 className="text-3xl font-bold text-left px-4 py-4">Cart Items</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartItems />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
