interface IUser {
  id?: number;
  email: string;
  password: string;
  balance: number;
}

interface IUserId {
  id: number,
}

export {
  IUser,
  IUserId,
};