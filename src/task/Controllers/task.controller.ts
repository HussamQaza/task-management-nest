import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from '../Services/task.service';
import { Task } from '../Interfaces/Task.interface';
import { CreatTaskDto } from '../Interfaces/CreatTaskDto.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Post()
  async addTask(@Body() creatTaskDto: CreatTaskDto): Promise<string> {
    this.taskService.adTask(creatTaskDto);
    return 'Task created';
  }
}
