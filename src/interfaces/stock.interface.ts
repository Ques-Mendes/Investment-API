interface IStock extends IStockWithoutC { 
  cost: number;
}
interface IStockWithoutC {
   stocksId: number; //CodAtivo
  // name: string;  
  quantity: number; //QtdAtivo
}

export {
  IStock,
  IStockWithoutC,
};