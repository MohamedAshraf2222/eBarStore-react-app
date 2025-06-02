import Navbar from "../../components/navbar";

const Cart = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white w-full">
        <Navbar title="Shopping Cart" backButton={true} showCart={false} />
        
      </div>
    </div>
  );
};

export default Cart;
