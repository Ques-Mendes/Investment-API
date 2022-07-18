interface IOrderUserId {
  id?: number;
  userId: number;
}

interface IOrderStockId {
  stockId: number;
}

interface IOrderWithStocks extends IOrderUserId {
  stocksIds: number[];
}

interface IOrder extends IOrderUserId, IOrderWithStocks {
  quantity: number;
}

export {
  IOrder,
  IOrderStockId,
  IOrderUserId,
  IOrderWithStocks,
};