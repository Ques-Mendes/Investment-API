interface IStock extends IStockWithoutC { 
  cost: number;
}
interface IStockWithoutC {
   id: number; //CodAtivo
  // name: string;  
  quantity: number; //QtdAtivo
}

export {
  IStock,
  IStockWithoutC,
};