import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class TimingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        return next.handle().pipe(
            tap(() => {
                const elapsed = Date.now() - now;
                console.log(`[Timing] ${request.method} ${request.url} - ${elapsed}ms`)
            })
        )
    }
}