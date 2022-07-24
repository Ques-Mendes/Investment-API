import HttpException from '../helpers/http.exception';
import { Ilogin } from '../interfaces';
import loginModel from '../models/login.model';

const userLogin = async (login: Ilogin): Promise<Ilogin[]> => {
  const user = await loginModel.login(login);
  if (!user.length) {
    throw new HttpException(401, 'Bad Request');
  }
  return user;
};

export default { userLogin };
