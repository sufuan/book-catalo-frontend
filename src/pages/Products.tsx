import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useGetBooksQuery } from '../redux/api/apiSlice';

export default function Products() {
  const { data, error, isLoading } = useGetBooksQuery(undefined);

  console.log(data?.data);

  const priceRange = 100;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state if needed
    return <div>Error: {error.message}</div>;
  }

  const handleSlider = (value: number[]) => {
    console.log(value);
  };

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {data?.data?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
