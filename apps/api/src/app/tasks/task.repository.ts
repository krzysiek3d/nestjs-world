import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';

import { CreateTaskDto, GetTasksFilterDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private readonly _logger = new Logger();

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Array<Task>> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` }
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this._logger.error(
        `Failed to get tasks for user "${
          user.userName
        }", Filters: ${JSON.stringify(filterDto)}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    try {
      delete task.user;
    } catch (error) {
      this._logger.error(
        `Failed to create a task user "${
          user.userName
        }". Data: ${JSON.stringify(createTaskDto)}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }

    return task;
  }
}
