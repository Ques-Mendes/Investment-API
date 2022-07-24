import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

import { Ilogin } from '../interfaces';

import HttpException from './http.exception';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'sbvjanbfadgnflkbfdbdamdmfpam';

const jwtConfig: SignOptions = { expiresIn: '15m', algorithm: 'HS256' };

const generateJWTToken = (user: Omit<Ilogin, 'password'>) => sign({ user }, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token: string | undefined): Promise<string | JwtPayload> => {
  if (!token) {
    throw new HttpException(401, 'Unauthorized');
  }
  try {
    const validate = verify(token, TOKEN_SECRET);
    return validate;
  } catch (error) {
    throw new HttpException(401, 'Unauthorized');
  }
};

export { generateJWTToken, authenticateToken };
