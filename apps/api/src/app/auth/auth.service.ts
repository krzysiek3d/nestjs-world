import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private readonly _logger = new Logger();

  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const userName = await this._userRepository.validateUserPassword(
      authCredentialsDto
    );

    if (!userName) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload: JwtPayload = { userName };
    const accessToken = await this._jwtService.sign(payload);
    this._logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`
    );

    return { accessToken };
  }
}
