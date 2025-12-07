import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req:Request, res: Response, next: NextFunction) {
        console.log('----Request middleware----');
        console.log(`Method: ${req.method}`);
        console.log(`URL: ${req.originalUrl}`);
        console.log(`Params: ${JSON.stringify(req.params)}`);
        console.log(`Query: ${JSON.stringify(req.query)}`);
        console.log(`Body: ${JSON.stringify(req.body)}`);
        console.log('-------------------------');
        next();
    }
}