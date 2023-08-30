import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  /* Create Relation with projects */
  @Post('add-to-project')
  public async addToProject(@Body() body: UserToProjectDTO) {
    return await this.usersService.relationToProject(body);
  }

  @Get('all')
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  public async findUserById(@Param('id') id: string) {
    return await this.usersService.findUserById(id);
  }

  @Put('update/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
