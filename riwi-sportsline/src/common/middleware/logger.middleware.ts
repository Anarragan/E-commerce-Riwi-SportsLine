import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        interface JwtPayload {
            id: number;
            email: string;
            role: string;
        }

        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl;
        const user = (req.user as JwtPayload)?.email || 'anonymous';

        console.log(`[${timestamp}] ${method} ${url} - User: ${user}`);
        next();
    }
}