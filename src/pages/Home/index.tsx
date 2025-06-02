import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {  fetchCartIndex, getProducts } from '../../slices/e-barStore/thunk';
import { useDispatch } from 'react-redux';
import MediaCard from '../../components/card';
import Navbar from '../../components/navbar';
import CartDrawer from '../../components/CartDrawer';
import CircularProgress from '@mui/material/CircularProgress';
const Home = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getProducts());
      await dispatch(fetchCartIndex());
      setLoading(false);
    };
    fetchData();

  }, [dispatch]);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const  {products}  = useSelector((state: any) => state.eBarStore);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
        <div className="min-h-screen bg-gray-900 text-white">
        <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} title="E-Bar Store" backButton={false} showCart={true} />

        <div className="bg-gray-900 w-full p-4 md:p-6">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
        E-Bar Products
        </h2>
    </div>
        {loading && <div className="flex justify-center items-center h-screen">
          <CircularProgress size={24} sx={{ mr: 2 }} />
        </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {products.map((product: any) => (
        <MediaCard key={product.id} id={product.id} image={product.image} title={product.name.en} price={product.total} />
    ))}
    </div>

    </div>
    </div>
    <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        // items={cartItems}
        // onUpdateQuantity={updateQuantity}
        // onClearCart={clearCart}
      />
    </>
  )
}

export default Home
