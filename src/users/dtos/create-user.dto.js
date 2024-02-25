import {createUserSchema} from "./create-user.schema.js";

export class CreateUserDto {
  constructor({email, password, rol, lenguage}) {
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.lenguage = lenguage;
  }

  static create({body}) {

    let { email, password, rol, lenguage } = body;

    const result = createUserSchema.validate({ email, password, rol, lenguage });

    if (result.error)
      return [result.error.message, null];

    return [null, new CreateUserDto({ email, password, rol, lenguage })];
  }

}