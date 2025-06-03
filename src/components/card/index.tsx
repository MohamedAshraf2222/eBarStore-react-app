import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch } from "react-redux";
import {
  fetchCartIndex,
  incrementCartItem,
} from "../../slices/e-barStore/thunk";
import { ShoppingCart } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
export default function MediaCard({
  id,
  image,
  title,
  price,
}: {
  id: string;
  image: string;
  title: {
    en: string;
    ar: string;
  };
  price: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();
  const { t, i18n } = useTranslation();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleAddToCart = async (bar_id: string) => {
    setButtonLoading(true);
    await dispatch(incrementCartItem({ bar_id }));
    setButtonLoading(false);
    await dispatch(fetchCartIndex());
  };
  return (
    <div className="h-full hover:-translate-y-1 transition-transform duration-200 bg-slate-900">
      <Card className="h-full overflow-hidden !bg-slate-900  text-white relative">
        <div className="relative overflow-hidden aspect-[3/4] cursor-pointer">
          {image ? (
            <img
              src={image}
              alt={i18n.language === "en" ? title?.en : title?.ar}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
            />
          ) : (
            <Typography variant="body1">No image available</Typography>
          )}
        </div>

        <CardContent className="p-4 flex flex-col space-y-3 bg-slate-900">
          <h3 className="font-bold text-lg line-clamp-2 text-white">
            {i18n.language === "en"
              ? title?.en.length > 10
                ? title?.en.substring(0, 10) + "..."
                : title?.en
              : title?.ar.length > 10
              ? title?.ar.substring(0, 10) + "..."
              : title?.ar}
          </h3>

          <span className="text-amber-400 font-semibold text-xl">
            ${price.toFixed(2)}
          </span>
          <div className="flex justify-between gap-2 items-center mt-auto">
            <Link to={`/product/${id}`} className="w-full">
              <button className="cursor-pointer w-full flex items-center justify-center border border-amber-500 px-2 py-1 bg-white hover:bg-transparent text-black rounded-md">
                <VisibilityIcon className="h-4 w-4 mr-1 text-amber-500" />
                <span className="font-semibold text-amber-500">
                  {t("View")}
                </span>
              </button>
            </Link>
            <button
              onClick={() => handleAddToCart(id)}
              className="cursor-pointer w-full flex items-center justify-center border border-amber-500 px-2 py-1 bg-amber-500 hover:bg-amber-600 text-black rounded-md"
            >
              {buttonLoading ? (
                <>
                  <CircularProgress className="!text-gray-500" size={24} />
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  <span className="font-semibold text-black">{t("Add")}</span>
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
