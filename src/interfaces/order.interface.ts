import { IStock } from "./stock.interface";
import { IUserId } from "./user.interface";


interface IOrder extends IUserId, IStock {}

export {
  IOrder,
}