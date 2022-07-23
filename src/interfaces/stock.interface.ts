interface IStock extends IStockWithoutC { 
  cost: number;
}
interface IStockWithoutC {
   stocksId: number;
  quantity: number; 
}

export {
  IStock,
  IStockWithoutC,
};