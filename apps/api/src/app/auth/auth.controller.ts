import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this._authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this._authService.signIn(authCredentialsDto);
  }
}
