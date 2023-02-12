export interface Product{
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
}

export interface Item {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
    quantity: string;
} 


export const productcount: string[] = ['1', '2', '3', '4', '5']