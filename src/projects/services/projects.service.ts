import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectReposity: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      return await this.projectReposity.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects: ProjectsEntity[] = await this.projectReposity.find();

      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron resultados en proyectos',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectReposity
        .createQueryBuilder('project')
        .where({ id })
        .getOne();

      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message:
            'No se encontro resultados en proyectos con el ID proporcionado',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    body: ProjectUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectReposity.update(id, body);

      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el proyecto con el ID proporcionado',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectReposity.delete(id);

      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el proyecto',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
