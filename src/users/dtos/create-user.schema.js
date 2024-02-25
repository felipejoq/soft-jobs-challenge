import Joi from 'joi';
// email, password, rol, lenguage

export const createUserSchema = Joi.object({
  email: Joi.string().email().required()
    .error(new Error('email es requerido')),
  password: Joi.string().min(3).required()
    .error(new Error('password es requerido')),
  rol: Joi.string().required()
    .error(new Error('rol es requerido')),
  lenguage: Joi.string().required()
    .error(new Error('lenguage es requerido')),
});