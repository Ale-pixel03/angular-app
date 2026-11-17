export interface Rating {
    rate: number;
    count: number;
}

export interface Productos {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:Rating;
}
 
export type ProductoInput= Pick<Productos, 'title' | 'price' | 'description' | 'category' | 'image' >