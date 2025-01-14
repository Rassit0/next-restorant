export interface IProduct {
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
    category:    IProductCategory | null;
}

export interface IProductCategory {
    name: string;
    slug: string;
}
