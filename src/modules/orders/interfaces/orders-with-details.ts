export interface IOrderWithDetails {
    id:        string;
    total:     number;
    status:    boolean;
    user:      string;
    client:    string;
    createdAt: Date;
    updatedAt: Date;
    details:   IOrderDetail[];
}

export interface IOrderDetail {
    productName:  string;
    productPrice: number;
    quantity:     number;
    subTotal:     number;
}
