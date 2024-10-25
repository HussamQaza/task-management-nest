import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { IUser } from 'src/users/interfaces/IUser';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser: IUser = { username: 'husam', password: 'Husam123' };
  const mockJwtToken = { accessToken: 'test-token' };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: {
            findUser: jest.fn(), // Mock function
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(mockJwtToken.accessToken), // Mock function for signAsync
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a valid JWT token for a valid user', async () => {
    jest.spyOn(usersService, 'findUser').mockResolvedValue(mockUser);

    const result = await service.signIn(mockUser.username, mockUser.password);
    expect(result).toEqual(mockJwtToken);
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: mockUser.username });
  });

  it('should throw UnauthorizedException for invalid username', async () => {
    jest.spyOn(usersService, 'findUser').mockResolvedValue(null);

    await expect(service.signIn('invalidUser', 'password')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    await expect(service.signIn(mockUser.username, 'wrongPassword')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for empty username', async () => {
    await expect(service.signIn('', 'password')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for empty password', async () => {
    await expect(service.signIn('username', '')).rejects.toThrow(UnauthorizedException);
  });

  it('should call findUser with the correct username', async () => {
    const findUserSpy = jest.spyOn(usersService, 'findUser').mockResolvedValue(mockUser);
    await service.signIn(mockUser.username, mockUser.password);
    expect(findUserSpy).toHaveBeenCalledWith(mockUser.username);
  });

  it('should throw an error if findUser fails', async () => {
    jest.spyOn(usersService, 'findUser').mockRejectedValue(new Error('Database error'));

    await expect(service.signIn(mockUser.username, mockUser.password)).rejects.toThrow(Error);
  });
});
