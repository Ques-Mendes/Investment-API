interface IUser {
  id?: number;
  email: string;
  password: string;
}

interface IUserId {
  id: number,
}

export {
  IUser,
  IUserId,
};