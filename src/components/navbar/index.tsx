import { Link } from "react-router-dom";
import {  ShoppingCart } from "@mui/icons-material";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
// import { Badge } from "@mui/material";

const Navbar = ({
  isCartOpen,
  setIsCartOpen,
  title,
  showCart,
  backButton,
}: {
  isCartOpen?: boolean;
  setIsCartOpen?: (isCartOpen: boolean) => void;
  title: string;
  showCart?: boolean;
  backButton: boolean;
}) => {
  const toggleCart = () => {
    setIsCartOpen?.(!isCartOpen);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cartItems: items } = useSelector((state: any) => state.eBarStore);

  const totalItems = items?.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  return (
    <nav className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 shadow-md w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {backButton && (
            <Link to="/">
              <ArrowLeft className="text-gray-500 mr-2 mt-1 cursor-pointer hover:text-gray-300 transition-colors duration-200" />
            </Link>
          )}

          <Link to={title === "E-Bar Store" ? "/" : "/cart"}>
            <h1 className="text-2xl font-bold text-amber-500">{title}</h1>
          </Link>
        </div>
        {showCart && (
          <div className="flex items-center space-x-4 mx-4">
            <button className="relative cursor-pointer" onClick={toggleCart}>
              <ShoppingCart className="h-6 w-6 text-amber-500" />
              {items?.length > 0 && (
                <Box className="absolute rounded-full -top-2 -right-3 p-2 leading-2 bg-amber-500 text-gray-900 hover:bg-amber-400">
                  {totalItems}
                </Box>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
