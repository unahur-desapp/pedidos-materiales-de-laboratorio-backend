import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../schemas/user';
import handlePromise from '../utils/promise';
import { BackendException } from '../shared/backend.exception';
import UserService from '../service/user.service';
import { RefreshTokenPayload, AccessTokenPayload } from '../types/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('ACCESS_TOKEN') private readonly accessTokenService: JwtService,
    @Inject('REFRESH_TOKEN') private readonly refreshTokenService: JwtService,
  ) {}

  public async registerUser(user: User) {
    const [dbUser, getUserErr] = await handlePromise(
      this.userService.findByEmail(user.email),
    );

    if (getUserErr) {
      throw getUserErr;
    }

    if (dbUser) {
      throw new BackendException(
        `Username ${user.email} already exists.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const [newUser, createUserErr] = await handlePromise(
      this.userService.createUser(user),
    );

    if (createUserErr) {
      throw new BackendException(
        `Cannot create user ${user.email}. Reason: ${createUserErr}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return newUser;
  }

  public async loginUser(email: string, password: string) {
    const [user, getUserErr] = await handlePromise(
      this.userService.findByEmail(email),
    );

    if (getUserErr) {
      throw getUserErr;
    }

    const [isValidPwd, pwdErr] = await handlePromise(
      this.userService.validatePassword(user, password),
    );

    if (pwdErr) {
      throw new BackendException(
        `Cannot validate usar: ${pwdErr}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!isValidPwd) {
      throw new BackendException(
        `Credentials are invalid`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = this.buildRefreshTokenPayload(user);

    return {
      access_token: await this.refreshTokenService.signAsync(payload),
    };
  }

  public async getAccessToken(email: string) {
    const [user, getUserErr] = await handlePromise(
      this.userService.findByEmail(email),
    );

    if (getUserErr) {
      throw getUserErr;
    }

    const payload = this.buildAccessTokenPayload(user);

    return this.accessTokenService.signAsync(payload);
  }

  private buildAccessTokenPayload(user: User): AccessTokenPayload {
    const { role, name, lastName, email } = user;

    return {
      role,
      name,
      lastName,
      email,
    };
  }

  private buildRefreshTokenPayload(user: User): RefreshTokenPayload {
    const { email } = user;

    return {
      email,
    };
  }
}
