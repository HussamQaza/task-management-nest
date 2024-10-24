import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthenticationModule, TaskModule],
})
export class AppModule {}
