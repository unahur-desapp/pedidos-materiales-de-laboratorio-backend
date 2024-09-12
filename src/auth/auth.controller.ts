import {
  Body,
  Controller,
  Post,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local.guard';
import { Public } from './providers/accesor.metadata';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(201)
  @Post('/register')
  registerUser(@Body() body: unknown) {
    const user = (body as any).user;
    return this.authService.registerUser(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Body() body: unknown) {
    const { email, password } = body as any;
    return this.authService.loginUser(email, password);
  }
}
