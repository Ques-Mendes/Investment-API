// interface IOrderUserId {
//   id?: number;
//   userId: number;
// }

import { IStock, IStockWithoutC } from "./stock.interface";
import { IUserId } from "./user.interface";

// interface IOrderStockId {
//   stockId: number;
// }

// interface IOrderWithStocks extends IOrderUserId {
//   stocksIds: number[];
// }

// interface IOrder extends IOrderUserId, IOrderWithStocks {
//   quantity: number;
// }

// export {
//   IOrder,
//   IOrderStockId,
//   IOrderUserId,
//   IOrderWithStocks,
// };

interface IOrder extends IUserId, IStock {
  // id: number, //codCliente
  // stocksId: number, //codAtivo
  // quantity: number, //QtdeAtivo
  // cost: number, // valor
}

export {
  IOrder,
}