import {query} from "../../database/db.js";
import {CREATE_USER, GET_USER_BY_EMAIL} from "../../database/queries/users.queries.js";
import {CreateUserDto} from "../dtos/create-user.dto.js";
import {CustomError} from "../../config/errors/custom.errors.js";
import {JwtPlugin} from "../../config/plugins/jwt.js";
import {Encoder} from "../../config/plugins/encoder.js";

export class UserService {
  constructor() {
  }

  async getUserByEmail({userEmail}) {

    const [result] = await Promise.all([
      query(GET_USER_BY_EMAIL, [userEmail])
    ]);

    const [user] = result.rows;

    return user;
  }

  async register({createUserDto}) {

    let {email, password, rol, lenguage} = createUserDto;

    const user = await this.getUserByEmail({userEmail: email});

    if(user)
      throw CustomError.badRequest('Ya existe un usuario con ese email');

    password = await Encoder.getHash({str: password});

    const [result] = await Promise.all([
      query(CREATE_USER, [email, password, rol, lenguage])
    ]);

    const [newUser] = result.rows;

    return newUser;
  }

  async login({email, password}) {

    const user = await this.getUserByEmail({userEmail: email});

    if (!user) throw CustomError.badRequest('Email o Password inválidos');

    const isMatching = await Encoder.compareHash({str: password, hash: user.password})

    if (!isMatching) throw CustomError.badRequest('Email o Password inválidos');

    delete user.password;

    const payload = {email: user.email};

    const token = await JwtPlugin.generateToken({payload});

    if (!token) throw CustomError.internalServer('Error creando el JWT');

    return {
      token,
    }

  }

}