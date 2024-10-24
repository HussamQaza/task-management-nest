import { Injectable } from '@nestjs/common';
import { Task } from '../interfaces/Task.interface';

@Injectable()
export class TaskService {
  private readonly tasks: Task[];
  constructor() {
    this.tasks = [];
  }

  getAll(): Task[] {
    return this.tasks;
  }

  adTask(task: Task) {
    this.tasks.push(task);
  }
}
