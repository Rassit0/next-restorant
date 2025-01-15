export interface IProductDetails {
    id:          string;
    name:        string;
    slug:        string;
    image:       string;
    description: string;
    price:       number;
    stock:       number;
    createdAt:   Date;
    updatedAt:   Date;
    categoryId:  string | null;
    category:    IproductDetailsCategory | null;
}

export interface IproductDetailsCategory {
    id:        string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}
