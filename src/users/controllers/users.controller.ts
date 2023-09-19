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
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { AccessLevel } from 'src/auth/decorators/access-level';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @ApiHeader({
    name: 'taskrr_token',
  })
  @AdminAccess()
  @Get('all')
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @ApiHeader({
    name: 'taskrr_token',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: 400,
    description: 'No se encontro resultados en Users con el ID proporcionado',
  })
  @Get(':id')
  public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  /* Create Relation with projects */
  @ApiHeader({
    name: 'taskrr_token',
  })
  @ApiParam({
    name: 'projectId',
  })
  @AccessLevel('OWNER')
  @Post('add-to-project/:projectId')
  public async addToProject(
    @Body() body: UserToProjectDTO,
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.usersService.relationToProject({
      ...body,
      project: id as unknown as ProjectsEntity,
    });
  }

  @ApiHeader({
    name: 'taskrr_token',
  })
  @ApiParam({
    name: 'id',
  })
  @Put('update/:id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiHeader({
    name: 'taskrr_token',
  })
  @ApiParam({
    name: 'id',
  })
  @Delete('delete/:id')
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
