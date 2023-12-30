import { IProduct } from '@/types/globalTypes';

import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  console.log(product);
  const viewDetails = (product: IProduct) => {
    <Link to={`/product-details/${product._id}`} className="w-full"></Link>;
  };
  return (
    <div>
      <Link to={`/product-details/${product._id}`} className="w-full">
        <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
          <img src={product?.img} alt="product" />
          <h1 className="text-xl font-semibold">{product?.title}</h1>
        </div>
      </Link>
    </div>
  );
}
