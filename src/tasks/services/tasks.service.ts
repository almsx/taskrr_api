import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TasksDTO } from '../dto/tasks.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  public async createTask(
    body: TasksDTO,
    projectId: string,
  ): Promise<TasksEntity> {
    try {
      const project = await this.projectService.findProjectById(projectId);
      if (project === undefined) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se ha encontrado el proyecto',
        });
      }
      return await this.taskRepository.save({
        ...body,
        project: project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
