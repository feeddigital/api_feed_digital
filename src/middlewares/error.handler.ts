import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/http.response"
const httpResponse = new HttpResponse();

export const errorHandler = (error:unknown, req:Request, res:Response, next: NextFunction) => {
    console.log( `error ${(error as Error)}`) 
    return httpResponse.ServerError(res, (error as Error))
}
