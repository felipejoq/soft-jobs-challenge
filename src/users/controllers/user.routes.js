import { Router } from "express";
import {UserController} from "./user.controller.js";
import {UserService} from "../services/user.service.js";
import {Encoder} from "../../config/plugins/encoder.js";
import {AuthMiddleware} from "../../middlewares/auth.middleware.js";

export class UserRoutes {

  static get routes() {

    const userRouter = Router();
    const userService = new UserService(new Encoder());
    const userController = new UserController(userService);

    userRouter.post('/usuarios', userController.register);
    userRouter.post('/login', userController.login);
    userRouter.get('/usuarios', [AuthMiddleware.validateJWT], userController.getUserByToken)

    return userRouter;
  }

}