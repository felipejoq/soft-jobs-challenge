import {handleError} from "../../config/errors/handle.errors.js";
import {CreateUserDto} from "../dtos/create-user.dto.js";
import {CustomError} from "../../config/errors/custom.errors.js";
import {LoginUserDto} from "../dtos/login-user.dto.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUserByToken = (req, res) => {
    res.json([req.body.user]);
  }

  register = (req, res) => {

    const {body} = req;

    const [error, createUserDto] = CreateUserDto.create({body});

    if(error)
      return handleError(CustomError.badRequest(error), res);

    this.userService.register({createUserDto})
      .then(users => res.status(201).json(users))
      .catch(error => handleError(error, res));
  }

  login = (req, res) => {
    const {body} = req;

    const [error, {email, password}] = LoginUserDto.create({body});

    if(error)
      return handleError(CustomError.badRequest(error), res);

    this.userService.login({email, password})
      .then(token => res.status(200).json(token))
      .catch(error => handleError(error, res));
  }

}