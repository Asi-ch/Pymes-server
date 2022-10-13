import { RequestHandler, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  User
} from './../../models';
const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  try {
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    req.userId = (decoded as any).sub;
    const user = await User.findOne({
      where: {
        id: req.userId
      }
    });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }
   
    req.user = user;
    // The token is valid for 1 hour
    // We want to send a new token on every request
    // const { userId } = jwtPayload;
    // const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    //   expiresIn: "1h"
    // });
    // res.setHeader("token", newToken);

    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      errors: [
        {
          "value": authorization ? authorization : "",
          "msg": "Unauthorized User",
          "param": "err"
        }
      ]
    });
  }
}

export default authMiddleware;