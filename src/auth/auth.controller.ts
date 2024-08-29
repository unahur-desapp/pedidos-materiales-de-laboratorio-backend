import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import AuthService from './auth.service';

@Controller('/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('/register')
  registerUser(@Body() body: unknown) {
    const user = (body as any).user;
    return this.authService.registerUser(user);
  }

  @Post('/login')
  gisterUser(@Body() body: unknown) {
    const { email, password } = body as any;
    return this.authService.loginUser(email, password);
  }
}
