import { useEffect, useState } from "react";
import CartItems from "../../components/cart";
import Navbar from "../../components/navbar";
import { useDispatch } from "react-redux";
import { fetchCartIndex } from "../../slices/e-barStore/thunk";
import OrderSummary from "../../components/cart/OrderSummary";
import CircularProgress from "@mui/material/CircularProgress";
const Cart = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCartIndex());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar title="Shopping Cart" backButton={true} showCart={false} />
      {loading ? (
        <div className="flex justify-center absolute top-0 left-0 text-white items-center h-full w-full bg-black/70 z-10">
          <div className="text-center">
            <CircularProgress size={24} sx={{ mr: 2 }} />
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-left px-4 py-4">Cart Items</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CartItems />
            <OrderSummary />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
