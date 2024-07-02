import * as services from "../services/user.services";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../types/User";
import { NextFunction, Request, Response } from "express";
import { Payload } from "../types/Payload";
import config from "../config/config";

export const generateToken = (user: User, time: string = "5m") => {
  const payload = { userId: user?._id };

  return jwt.sign(payload, config.SECRET_KEY || '', { expiresIn: time });
};

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    if (!token) res.status(401).json({ msg: "Unhautorized" });
    const decode: Payload | any = jwt.verify(token, config.SECRET_KEY || '');
    const user = await services.getById(decode?.userId);
    if (!user) res.status(404).json({ msg: "User not found" });
    //REFRESH TOKEN
    if(user) {
      const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      const tokenExp = decode.exp; // Tiempo de expiración del token
      const timeUntilExp = tokenExp - now; // Tiempo hasta la expiración en segundos
      if (timeUntilExp <= 300) {
        // 300 segundos = 5 minutos
        const newToken = generateToken(user, "5m");
        console.log("=> SE REFRESCÓ EL TOKEN");
        res.cookie('token', newToken, { httpOnly: true })
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(403).json({ msg: "Unhautorized" });
  }
};
