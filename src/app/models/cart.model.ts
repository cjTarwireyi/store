
export interface Cart{
    items: ICartItem[]
}
export interface ICartItem{
    product: string,
    name:string,
    price:number,
    quantity:number,
    id:number
}