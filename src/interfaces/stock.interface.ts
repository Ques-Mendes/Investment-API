export default interface IStock {
  id: number;
  name: string;
  quantity: number;
  cost: number;
  orderId?: number;
}