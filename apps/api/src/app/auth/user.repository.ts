import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;

    const user = new User();

    user.userName = userName;
    user.salt = await bcrypt.genSalt();
    user.password = await this._hashPassword(password, user.salt);

    console.log('user.password: ', user.password);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplictae user name
        throw new ConflictException('User name already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<string> {
    const { userName, password } = authCredentialsDto;
    const user = await this.findOne({ userName });

    if (user && (await user.validatePassword(password))) {
      return user.userName;
    } else {
      return null;
    }
  }

  private async _hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
