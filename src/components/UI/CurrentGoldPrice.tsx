import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CurrentGoldPrice = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { products } = useSelector((state: any) => state.eBarStore);
  const {t}=useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentGoldPrice = products.find((product: any) => product.weight === "1.00")?.gold_price;
  return (
    <>
      {/* Gold Price Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-gray-900 py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 md:space-x-4">
            <span className="text-sm md:text-lg font-semibold">
              {t("CurrentGoldPrice")}
            </span>
            <span className="text-lg md:text-2xl font-bold">
              ${currentGoldPrice?.toFixed(2)}
            </span>
          </div>
          <p className="text-sm mt-1 opacity-80">
            {t("LastUpdated")} {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrentGoldPrice;
