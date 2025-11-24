import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const ctx = context.switchToHttp();
                const request = ctx.getRequest();

                return {
                    data,
                    meta: {
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        method: request.method,
                    },
                };
            }),
        );
    }
}