import {
  Body,
  Post,
  Controller,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectsService.createProject(body);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectsService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id') id: string) {
    return await this.projectsService.findProjectById(id);
  }

  @Put('update/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectsService.updateProject(body, id);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
