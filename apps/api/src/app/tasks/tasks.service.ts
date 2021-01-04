import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

import { CreateTaskDto, GetTasksFilterDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly _taskRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Array<Task>> {
    return this._taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this._taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
    return found;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this._taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this._taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await task.save();

    return task;
  }
}
