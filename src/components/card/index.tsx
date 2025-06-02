import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
import { fetchCartIndex, incrementCartItem } from '../../slices/e-barStore/thunk';
import { ShoppingCart } from '@mui/icons-material';
export default function MediaCard({id, image, title, price }: { id: string; image: string; title: string; price: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch:any = useDispatch();

  const handleAddToCart = async (bar_id: string) => {
    await dispatch(incrementCartItem({ bar_id }));
    await dispatch(fetchCartIndex());
  };
  return (
    <div className="h-full hover:-translate-y-1 transition-transform duration-200 bg-slate-900">
      <Card className="h-full overflow-hidden !bg-slate-900  text-white relative">
        <div className="relative overflow-hidden aspect-[3/4] cursor-pointer">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
          />
        </div>

        <CardContent className="p-4 flex flex-col space-y-3 bg-slate-900">
          <h3 className="font-bold text-lg line-clamp-2 text-white">
            {title.length > 10 ? title.substring(0, 10) + "..." : title}
          </h3>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-amber-400 font-semibold text-xl">
              {price.toFixed(2)}L.E
            </span>

            <button
              onClick={() => handleAddToCart(id)}
              className="cursor-pointer px-2 bg-amber-500 hover:bg-amber-600 text-black rounded-full"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
