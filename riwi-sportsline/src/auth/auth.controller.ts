import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { type Request, type Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import path from 'path';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  @Public()
  @ApiOperation({ summary: 'Redirige a Google para login OAuth' })
  googleLogin() { }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  @Public()
  @ApiOperation({ summary: 'Callback de Google OAuth' })
  @ApiResponse({ status: 200, description: 'Devuelve access token y setea refresh token en cookie' })
  async googleCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const googleUser = req.user as { email: string, name: string };
    const { accessToken, refreshToken } = await this.authService.loginWithGoogle(googleUser);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/auth",
    })

    return { accessToken };
  }

  @Public()
  @Post("login")
  @ApiOperation({ summary: 'Login con JWT' })
  @ApiResponse({ status: 200, description: 'Devuelve access token y setea refresh token en cookie' })
  async login(
    @Body() dto: loginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      dto.email,
      dto.password,
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/auth"
    });

    return { accessToken }
  }

  @Public()
  @Post("refresh")
  @ApiOperation({ summary: 'Renovar access token con refresh token en cookie' })
  @ApiResponse({ status: 200, description: 'Devuelve nuevo access token' })
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies["refreshToken"];
    return this.authService.refresh(refreshToken)
  }

  @Public()
  @Post("logout")
  @ApiOperation({ summary: 'Cerrar sesión y limpiar cookie refreshToken' })
  @ApiResponse({ status: 200, description: 'Logout exitoso' })
  async logout(@Res() res: Response) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth",
    })

    return res.json({
      success: true,
      message: "Logout Exitoso, sesion cerrada"
    })
  }
}
