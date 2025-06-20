import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import {
  Box,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  fetchCartIndex,
  clearCart,
} from "../../slices/e-barStore/thunk";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const CartItems = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cartItems: items } = useSelector((state: any) => state.eBarStore);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const handleCartAction = async (action: Function, id: string) => {
    setLoading(true);
    await dispatch(action({ bar_id: id }));
    await dispatch(fetchCartIndex());
    setLoading(false);
  };

  const handleIncrement = (id: string) =>
    handleCartAction(incrementCartItem, id);
  const handleDecrement = (id: string) =>
    handleCartAction(decrementCartItem, id);
  const handleRemove = (id: string) => handleCartAction(deleteCartItem, id);

  const handleClearCart = async () => {
    setLoading(true);
    await dispatch(clearCart());
    await dispatch(fetchCartIndex());
    setLoading(false);
  };

//   const subtotal = items?.items?.reduce(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (sum: number, item: any) => sum + item.total,
//     0
//   );

  return (
    <>
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center absolute top-0 left-0 text-white items-center h-full w-full bg-black/70 z-10">
            <div className="text-center">
              <CircularProgress size={24} sx={{ mr: 2 }} />
            </div>
          </div>
        )}
        {items?.items?.length > 0 && (
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            className="!bg-gray-900 text-white"
          >
            {/* Cart Items */}
            <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
              {items?.items?.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "text.secondary",
                    py: 8,
                  }}
                >
                  <Box sx={{ fontSize: 64, opacity: 0.3, mb: 2 }}>
                    <ShoppingCart className="text-white" />
                  </Box>
                  <Typography className="text-white" variant="h6">
                    Your cart is empty
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {}}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              ) : (
                <List>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {items?.items?.map((item: any) => (
                    <Paper
                      key={item.id}
                      elevation={0}
                      sx={{ mb: 2, bgcolor: "action.hover" }}
                    >
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemove(item.bar.id)}
                            color="error"
                          >
                            <Trash2 />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={item?.bar.image}
                            alt={item?.bar.name.en}
                            className="object-cover"
                            variant="rounded"
                            sx={{ width: 56, height: 56, mr: 2 }}
                          />
                        </ListItemAvatar>
                        <div className="flex flex-col w-full">
                          <ListItemText
                            className="text-white "
                            primary={i18n.language === "en" ? item?.bar.name.en : item?.bar.name.ar}
                          />
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  mt: 1,
                                }}
                              >
                                <div className="flex w-full justify-between items-center">
                                  <Box
                                    className="flex items-center !bg-gray-800 text-white rounded-md"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      bgcolor: "background.default",
                                      borderRadius: 1,
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        handleDecrement(item.bar.id)
                                      }
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus
                                        fontSize="small"
                                        className="text-gray-400 hover:text-white"
                                      />
                                    </IconButton>
                                    <Typography sx={{ mx: 1 }}>
                                      {item?.quantity}
                                    </Typography>
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        handleIncrement(item.bar.id)
                                      }
                                    >
                                      <Plus
                                        fontSize="small"
                                        className="text-gray-400 hover:text-white"
                                      />
                                    </IconButton>
                                  </Box>
                                </div>
                                <Typography
                                  className="text-amber-400"
                                  fontWeight="bold"
                                >
                                  ${+(item.total || 0).toFixed(2)}
                                </Typography>
                              </Box>
                            }
                          />
                        </div>
                      </ListItem>
                      <Typography className="text-amber-400" fontWeight="bold">
                        {item.quantity} *{" "}
                        {+(item.total || 0).toFixed(2) / item.quantity} = $
                        {+(item.total || 0).toFixed(2)}
                      </Typography>
                    </Paper>
                  ))}
                </List>
              )}
            </Box>

            {/* Footer */}
            {items?.items?.length > 0 && (
              <Box
                sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography className="text-gray-400">{t("Subtotal")}</Typography>
                  <Typography variant="h6" className="text-amber-400">
                    ${+(items?.prices?.gold_sub_total || 0).toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={handleClearCart}
                  >
                    {t("ClearCart")}
                  </Button>
                  <Link to="/cart" className="w-full">
                    <Button
                      variant="contained"
                      className="!bg-amber-400 text-white w-full hover:!bg-amber-500"
                      fullWidth
                    >
                      {t("Checkout")}
                    </Button>
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </div>
    </>
  );
};

export default CartItems;
