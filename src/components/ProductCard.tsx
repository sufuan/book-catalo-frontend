import { IProduct } from '@/types/globalTypes';

import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const viewDetails = (product: IProduct) => {
    <Link to={`/product-details/${product._id}`} className="w-full"></Link>;
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-full">
          <img src={product?.img} alt="product" />
          <h1 className="text-xl font-semibold">{product?.title}</h1>

          <p>Rating: {product?.rating}</p>
          <p className="text-sm">
            Availability: {product?.status ? 'In stock' : 'Out of stock'}
          </p>
          <p className="text-sm">Price: {product?.price}</p>
        </Link>
      </div>
    </div>
  );
}
