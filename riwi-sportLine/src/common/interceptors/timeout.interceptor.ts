import { CallHandler, NestInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable, TimeoutError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            timeout(5000),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    throw new Error('Request timed out');
                }
                throw err;
            }),
        );
    }
}
