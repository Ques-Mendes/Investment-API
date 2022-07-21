export interface IInvest {
  userId: number;
  stocksId: number;
  quantity: number;
}

export interface IInvestment extends IInvest {
  id: number;  
}
  