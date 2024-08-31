export interface Addproducttocartres {
  status: string;
  message: string;
  numOfCartItems: number;
  data: Iproductcart;
}

export interface Iproductcart {
  _id: string;
  cartOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Product {
  count: number;
  _id: string;
  product: string;
  price: number;
}
