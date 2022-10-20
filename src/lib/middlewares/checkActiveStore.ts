import { RequestHandler, Request, Response, NextFunction } from 'express';

const checkActiveStoreMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      if (req.user.activeStoreId) {
        next();
      } else {
        res.status(401).json({
          success: false,
          errors: [
            {
              "value": "Active Client is not set",
              "msg": "Active Client is not set",
            }
          ]
        });
      }
    } else {
      res.status(401).json({
        success: false,
        errors: [
          {
            "value": "User is not authorized",
            "msg": "Unauthorized User",
          }
        ]
      });
    }
  } catch (errors) {
    res.status(401).json({
      success: false,
      errors
    });
  }
}

export default checkActiveStoreMiddleware;