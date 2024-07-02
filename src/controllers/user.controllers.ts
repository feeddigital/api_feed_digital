import { NextFunction, Request, Response } from "express";
import * as service from "../services/user.services";
import { HttpResponse } from "../utils/http.response";
const httpResponse = new HttpResponse();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await service.register(req.body);
    if (!newUser) return httpResponse.NotFound(res, "Validation error!");
    else return httpResponse.Ok(res, newUser);
  } catch (error: unknown) {
    next((error as Error).message);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const users = await service.getAll();
    if (!users) return httpResponse.NotFound(res, "users not found");
    return httpResponse.Ok(res, users);
  } catch (error: unknown) {
    next((error as Error).message);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await service.getById(id);
    if (!user) return httpResponse.NotFound(res, "user not found");
    return httpResponse.Ok(res, user);
  } catch (error) {
    next((error as Error).message);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let user = await service.getById(id);
    if (!user) return httpResponse.NotFound(res, "user not found!");
    const userUpdated = await service.update(id, req.body);
    return httpResponse.Ok(res, userUpdated);
  } catch (error) {
    next((error as Error).message);
  }
};

//Cambia estado active: false
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await service.getById(id);
    if (!user) return httpResponse.NotFound(res, "user not found!");
    const userDel = await service.remove(id);
    if (!userDel) return httpResponse.NotFound(res, "Error deleted user");
    return httpResponse.Ok(res, userDel);
  } catch (error) {
    next((error as Error).message);
  }
};

export const googleResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.user);
    //   const { first_name, last_name, email, role } = req.user;
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
