import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { IJWTPayload, IJWTToken } from '../interfaces/IJWTToken';
import { IUser } from 'src/users/interfaces/IUser';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<IJWTToken> {
    const user: IUser = await this.usersService.findUser(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    // TODO: generate JWT and create session
    const payload: IJWTPayload = { sub: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
