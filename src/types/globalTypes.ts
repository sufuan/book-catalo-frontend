export interface IProduct {
  _id: number;
  name: string;
  img: string;
  price: number;
  features: string[];
  status: boolean;
  rating: number;
  quantity?: number;
}
