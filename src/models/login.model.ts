import { Ilogin } from '../interfaces';
import connection from './connection';

const login = async (user: Ilogin): Promise<Ilogin[]> => {
  const { email, password } = user;
  const [userLogin] = await connection.execute(
    'SELECT * FROM Users WHERE email=? AND password=?',
    [email, password],
  );
  return userLogin as Ilogin[];
};

export default { login };
