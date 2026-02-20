export interface IOrderWithDetails {
  id: string;
  total: number;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  user: string;
  client: string;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  details: IOrderDetail[];
}

export interface IOrderDetail {
  productName: string;
  productPrice: number;
  quantity: number;
  subTotal: number;
}
