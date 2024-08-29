import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user';
import UserService from '../service/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  AccessTokenProvider,
  RefreshTokenProvider,
} from '../config/jwt.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync(AccessTokenProvider),
    JwtModule.registerAsync(RefreshTokenProvider),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
})
export class AuthModule {}
