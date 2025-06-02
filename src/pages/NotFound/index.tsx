import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="min-h-screen bg-gray-900 text-white w-full flex flex-col items-center justify-start h-full">
        <Navbar title="E-Bar Store" backButton={true} showCart={false} />
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">404</h1>

          <p className="text-2xl mb-4">Page not found</p>
          <Link to="/">
            <Button
              variant="contained"
              className="!bg-amber-500 !text-white hover:!bg-amber-600"
            >
              Go back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
