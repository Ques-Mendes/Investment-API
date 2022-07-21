
// import { ResultSetHeader } from "mysql2";
// import { IInvest, IInvestment } from "../interfaces";
// import connection from "./connection";

// const createOrder = async (order: IInvest): Promise<IInvestment> => {
//   const { userId, stocksId, quantity } = order;
  
//   const result = await connection.execute<ResultSetHeader>(`
//   INSERT INTO Investments.Orders (userId, stocksId, quantity) VALUES (?, ?, ?)`,
//   [userId, stocksId, quantity]
//   );
//   const [dataInserted] = result;
//   const { insertId } = dataInserted;
//   return {id: insertId, ...order};
// };

// export default {
//   createOrder,
// };