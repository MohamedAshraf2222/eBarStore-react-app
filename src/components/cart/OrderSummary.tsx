import { Button,  } from '@mui/material';
import {
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cartItems: items } = useSelector((state: any) => state.eBarStore);

      const totalItems = items?.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, item: any) => sum + item.quantity,
    0
  );
    const subtotal = items?.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sum: number, item: any) => sum + item.total,
      0
    );
  return (
    <div className="lg:col-span-1 ">
      <Card className="!bg-gray-800 border-gray-800 sticky top-24 !rounded-lg  shadow-md mx-4 mb-10 lg:mb-0 ">
        {/* <CardHeader className="bg-gray-800"> */}
        <Typography className="text-white bg-gray-800 p-4 !text-2xl !font-bold">
          Order Summary
        </Typography>
        {/* </CardHeader> */}
        <CardContent className="space-y-4 bg-gray-800">
          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex bg-gray-800 justify-between text-gray-400">
              <span>Subtotal ({totalItems} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* {discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount (10%)</span>
                {/* <span>-${discount.toFixed(2)}</span> */}
            {/* </div> */}
            {/* )} */}

            <div className="flex justify-between text-gray-400">
              <span>Tax</span>
              <span>${(20).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>${(20).toFixed(2)}</span>
              {/* <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span> */}
            </div>

            {/* {shipping > 0 && (
              <p className="text-xs text-gray-500">
                Free shipping on orders over $75
              </p>
            )} */}
          </div>

          <Divider className="bg-gray-700 inline-block w-full my-6" />

          {/* Total */}
          <div className="flex justify-between text-xl font-bold">
            <span className="text-white">Total</span>
            <span className="text-amber-400">${subtotal.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <div className="flex flex-col gap-2 mt-4">
            
            <Button
              variant="contained"
              className="!bg-amber-400 text-white w-full hover:!bg-amber-500  transition-all duration-300"
              fullWidth
              >
                Proceed to Checkout
            </Button>

            {/* Continue Shopping */}
            <Link to="/">
              <Button
                variant="contained"
                className="w-full !mt-1 !bg-white !border !border-gray-600 !text-gray-400 hover:!bg-transparent hover:!border-gray-600 hover:!text-white"
                fullWidth
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderSummary
