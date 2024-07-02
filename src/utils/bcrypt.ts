import bcryptjs from 'bcryptjs';
import { User } from '../types/User';

/**
 * funcion que realiza el encriptado de contraseña a través de bcryptjs con el método hashSync. 
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = (password: string) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

/**
 * 
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
export const isValidPassword = (user: User, password: string) => bcryptjs.compareSync(password, user.password);