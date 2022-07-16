interface IStock {
  id: number;
  name: string;
  quantity: number;
  cost: number;
  orderId?: number;
}

interface IStockById {
  id: number;
  quantity: number;
  cost: number;
}

export {
  IStock,
  IStockById,
};