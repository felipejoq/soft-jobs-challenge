import { Router } from "express";
import {UserRoutes} from "../../users/controllers/user.routes.js";

export class AppRouter {

  constructor() { }

  static get routes() {

    const AppRouter = Router();

    AppRouter.use('/', UserRoutes.routes);

    return AppRouter;
  }

}