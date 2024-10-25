import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from 'src/users/services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/IUser';
import { jwtConstants } from '../helpers/JWTConstants';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  const validUser: IUser = {
    username: "husam",
    password: "Husam123"
  }
  const invalidUser: IUser = {
    username: "foo",
    password: "bar"
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60s',
        },
      }),],
      controllers: [AuthenticationController],
      providers: [AuthenticationService, UsersService]
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return access token for the vaild user', async () => {
    const token = await controller.signIn(validUser)
    expect(token).toBeDefined()
    expect(token.accessToken).toBeDefined()
  })

  it('should throw UnauthorizedException for invalid login', async () => {

    await expect(controller.signIn(invalidUser)).rejects.toThrow(UnauthorizedException)

  })
});
