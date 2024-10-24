import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { IUser } from 'src/users/interfaces/IUser';
import { IJWTToken } from '../interfaces/IJWTToken';
import { PublicAPI } from '../helpers/PublicDecorator';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @PublicAPI()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() user: IUser): Promise<IJWTToken> {
    return this.authService.signIn(user.username, user.password);
  }
}
