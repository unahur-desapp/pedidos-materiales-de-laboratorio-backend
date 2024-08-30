import { Body, Controller, Post, HttpCode, Headers } from '@nestjs/common';
import AuthService from './auth.service';
import { Public, RefreshAuth } from '../config/accesor.metadata';

@Controller('/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(201)
  @Post('/register')
  registerUser(@Body() body: unknown) {
    const user = (body as any).user;
    return this.authService.registerUser(user);
  }

  @Public()
  @Post('/login')
  loginUser(@Body() body: unknown) {
    const { email, password } = body as any;
    return this.authService.loginUser(email, password);
  }

  @RefreshAuth()
  @Post('/token')
  getAccessToken(@Headers() headers: unknown) {
    const { authorization } = headers as any;
    console.log({ authorization });
    return this.authService.exchangeAccessToken(authorization.split(' ')[1]);
  }
}
