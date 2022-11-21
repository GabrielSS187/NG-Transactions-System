import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../adapters/Jwt-adapter/Jwt-adapter";

import { CustomError } from "../errors/CustomError";
import { TokenError } from "../errors/TokenError";

const jwt = new JwtAdapter();

export const authMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
  const { authorization } = req.headers;

  if ( !authorization ) throw new TokenError();

  const token = authorization.replace("Bearer", "").trim();

  try {
    const decoded = jwt.getTokenData({ token });

    const { id } = decoded;
    req.userId = id;

    next();
    } catch (error: any) {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(401).json(error.message)
    };
  };
};