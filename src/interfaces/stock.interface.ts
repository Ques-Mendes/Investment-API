export interface IStock extends IStockWithoutC {
  cost: number;
}
export interface IStockWithoutC {
  stocksId: number;
  quantity: number;
}
