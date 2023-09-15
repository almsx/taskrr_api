import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles('CREATOR')
  @Post('create/userOwner/:userId')
  public async createProject(
    @Body() body: ProjectDTO,
    @Param('userId') userId: string,
  ) {
    return await this.projectsService.createProject(body, userId);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectsService.findProjects();
  }

  @Get(':projectId')
  public async findProjectById(@Param('projectId') id: string) {
    return await this.projectsService.findProjectById(id);
  }

  @AccessLevel('OWNER')
  @Put('update/:projectId')
  public async updateUser(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectsService.updateProject(body, id);
  }

  @Delete('delete/:projectId')
  public async deleteUser(@Param('projectId', new ParseUUIDPipe()) id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
