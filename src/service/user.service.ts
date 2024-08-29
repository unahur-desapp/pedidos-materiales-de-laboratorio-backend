import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user';
import { Model } from 'mongoose';
import handlePromise from '../utils/promise';
import { BackendException } from '../shared/backend.exception';

@Injectable()
export default class UserSerivice {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User> {
    const [user, err] = await handlePromise(
      this.userModel.findOne({
        email,
      }),
    );

    if (err) {
      throw new BackendException(
        `Cannot get user ${email}. Reason: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    console.log({ user });

    return user;
  }

  async createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
