// const userService = require('../services/userService.js');
// const { STATUS_OK } = require('../helpers/statusHTTP');

import usersService from "../services/users.service"

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const token = await userService.getUser({ email, password });
//   return res.status(STATUS_OK).json({ token });
// };

// module.exports = { login };

// const login = async (req: Request, res: Response): Promise<Response> => {
//   const { email, id } = req.body
//   const user = await usersService.getUser(id)
// }