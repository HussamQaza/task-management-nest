import { Module } from '@nestjs/common';
import { TaskService } from './Services/task.service';
import { TaskController } from './Controllers/task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
