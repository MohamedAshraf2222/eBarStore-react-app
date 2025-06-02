import { useSelector } from "react-redux";

const CurrentGoldPrice = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { products } = useSelector((state: any) => state.eBarStore);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentGoldPrice = products.find((product: any) => product.weight === "1.00")?.gold_price;
  return (
    <>
      {/* Gold Price Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-gray-900 py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-lg font-semibold">
              Current Gold Price (per gm):
            </span>
            <span className="text-2xl font-bold">
              ${currentGoldPrice?.toFixed(2)}
            </span>
            
          </div>
          <p className="text-sm mt-1 opacity-80">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrentGoldPrice;
