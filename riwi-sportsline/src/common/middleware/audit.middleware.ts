import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    const { method, originalUrl, ip } = req;

    console.log(`[AUDIT] ${timestamp} - ${method} ${originalUrl} - IP: ${ip}`);

    // Registrar tiempo de respuesta
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(
        `[AUDIT] ${timestamp} - ${method} ${originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  }
}
