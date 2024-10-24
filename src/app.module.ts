import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthenticationModule, TaskModule, UsersModule],
})
export class AppModule {}
