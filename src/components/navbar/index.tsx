import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { ArrowLeft, Globe } from "lucide-react";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();
  const toggleCart = () => {
    setIsCartOpen?.(!isCartOpen);
  };
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
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
        <div className="">
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
        </div>
        <div className=" flex justify-center items-center gap-2">
          <Button
            onClick={toggleLanguage}
            className="!text-amber-500 hover:!text-amber-400 hover:!bg-gray-700"
          >
            <Globe className="h-4 w-4 mx-2" />
            {i18n.language === "en" ? "العربية" : "English"}
          </Button>
          {showCart && (
            <div className="flex items-center space-x-4 mx-4">
              <button className="relative cursor-pointer" onClick={toggleCart}>
                <ShoppingCart className="h-6 w-6 text-amber-500" />
                {items?.length > 0 && (
                  <Box className="absolute rounded-full -top-3 -right-4 p-2 leading-2 bg-amber-500 text-gray-900 hover:bg-amber-400">
                    {totalItems}
                  </Box>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
