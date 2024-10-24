import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TaskService } from '../services/task.service';
// import { Task } from '../interfaces/Task.interface';
import { CreatTaskDto } from '../interfaces/CreatTaskDto.dto';
import { AuthGuard } from 'src/authentication/helpers/AuthGuard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.taskService.getAll();
  }


  @UseGuards(AuthGuard)
  @Post()
  async addTask(@Body() creatTaskDto: CreatTaskDto): Promise<string> {
    this.taskService.adTask(creatTaskDto);
    return 'Task created';
  }
}
