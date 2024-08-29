import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../schemas/user';
import handlePromise from '../utils/promise';
import { BackendException } from '../shared/backend.exception';
import UserSerivice from '../service/user.service';

@Injectable()
export default class AuthService {
  constructor(private readonly userService: UserSerivice) {}

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
      user.comparePassword(password),
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

    return `refresh token`;
  }
}
