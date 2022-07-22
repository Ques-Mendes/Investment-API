import { IStock } from "./stock.interface";
import { IUserId } from "./user.interface";


interface IOrder extends IUserId, IStock {
  // id: number, //codCliente
  // stocksId: number, //codAtivo
  // quantity: number, //QtdeAtivo
  // cost: number, // valor
}

export {
  IOrder,
}