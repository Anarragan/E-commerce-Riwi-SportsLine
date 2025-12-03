import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { API_REQUIRED_KEY } from "../../common/decorators/api-key.decorator";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.getAllAndOverride<boolean>(API_REQUIRED_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!required) return true;

        const req = context.switchToHttp().getRequest();
        const apiKey = req.headers["x-api-key"] as string | undefined;

        if (!apiKey) throw new UnauthorizedException("Falta x-api-key");

        const validKey = process.env.API_KEY;

        if (!validKey) throw new ForbiddenException("API key no configurada en el servidor");

        if (apiKey !== validKey) throw new UnauthorizedException("API key invalida");

        return true;
    }
}