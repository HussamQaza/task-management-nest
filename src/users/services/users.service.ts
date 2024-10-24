import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/IUser';



@Injectable()
export class UsersService {
  private readonly user1: IUser = { username: "husam", password: "Husam123" }
  private readonly user2: IUser = { username: "husam2", password: "Husam1232" }

  private readonly users: IUser[] = [this.user1, this.user2]


  async findUser(username: string): Promise<IUser | undefined> {
    return this.users.find(u => u.username == username)
  }
}
