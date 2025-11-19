import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable() 
export class AuditMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const ip =
        req.ip ||
        (req.headers['x-forwarded-for'] as string) ||
        req.socket.remoteAddress;
        const timeStamp = new Date().toISOString();

        console.log(`[${timeStamp}] ${method} ${originalUrl} from ${ip}`)

        next()
    }
}
