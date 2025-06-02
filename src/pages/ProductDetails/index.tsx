import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../slices/e-barStore/thunk";
import { fetchCartIndex } from "../../slices/e-barStore/thunk";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface Product {
  id: string;
  weight: string;
  image: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  maker: string;
  karat: string;
  fineness: number;
  cashback: number;
  making_charge: number;
  gold_price: number;
  total: number;
}

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxHeight: "500px",
  objectFit: "contain",
  borderRadius: "8px",
  [theme.breakpoints.up("md")]: {
    height: "500px",
    objectFit: "cover",
  },
}));

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { products } = useSelector((state: any) => state.eBarStore);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all([
          dispatch(getProducts()),
          dispatch(fetchCartIndex()),
        ]);
      } catch (err) {
        setError("Failed to fetch product data. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(
        (product: Product) => product.id == id
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Product not found");
      }
    }
  }, [products, id]);

  const handleAddToCart = () => {
    console.log("Add to cart:", product);
  };

  const calculatePrice = (product: Product) => {
    return (product.gold_price + product.making_charge).toFixed(2);
  };

  if (error) {
    return (
      <div>
        <Navbar title="Product Details" backButton={true} showCart={false} />
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar title="Product Details" backButton={true} showCart={false} />
      <Box sx={{ p: 4 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : product ? (
          <Paper
            elevation={3}
            sx={{ p: 4 }}
            className="!bg-slate-900 !shadow-none"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                {product.image ? (
                  <div className="flex justify-center">
                    <ProductImage
                      src={product.image}
                      alt={product.name.en}
                      className="border rounded-lg object-cover border-slate-600"
                    />
                  </div>
                ) : (
                  <Box
                    sx={{
                      height: "400px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "slate.700",
                      borderRadius: "8px",
                      border: "1px dashed #64748b",
                    }}
                  >
                    <Typography variant="body1">No image available</Typography>
                  </Box>
                )}
              </div>

              <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-between">
                <Typography variant="h3" component="h2" className="text-white !mb-2">
                  {product.name.en}
                </Typography>

                <Typography variant="body1" className="text-slate-300">
                  {product.description.en}
                </Typography>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="subtitle2" className="text-slate-400">
                      Maker
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {product.maker}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="subtitle2" className="text-slate-400">
                      Weight
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {product.weight}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="subtitle2" className="text-slate-400">
                      Karat
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {product.karat}K ({product.fineness} fineness)
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="subtitle2" className="text-slate-400">
                      Cashback
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {product.cashback}%
                    </Typography>
                  </div>
                </div>

                <div className="pt-4">
                  <Typography variant="h4" className="text-amber-500">
                    ${calculatePrice(product)}
                  </Typography>
                  <Typography variant="body2" className="text-slate-400">
                    {product.total > 0
                      ? `${product.total} available in stock`
                      : "Out of stock"}
                  </Typography>
                </div>

                <div className="mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAddToCart}
                    disabled={product.total <= 0}
                    className="!bg-amber-600 hover:!bg-amber-700 w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        ) : null}
      </Box>
    </div>
  );
};

export default ProductDetails;
