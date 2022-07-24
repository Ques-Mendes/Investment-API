import { IStock } from './stock.interface';
import { IUserId } from './user.interface';

export interface IOrder extends IUserId, IStock {}
