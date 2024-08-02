import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskEntity } from'src/task/entities/task.entity';
import { TaskInterceptor } from './interceptors/task.interceptor';
import { RolesGuard } from 'src/auth/local/roles.guard';
import { Roles } from 'src/auth/local/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(
   
    private readonly taskService: TaskService) {}
  //@UseGuards(JwtAuthGuard)
  @UseInterceptors(TaskInterceptor)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto,@Request() {user}:any) {
    console.log("----------------------",user);

    
    // console.log(createTaskDto)

    // try {
    //   await this.taskService.create(
    //     createTaskDto,
    //     user
    //   );

    //   return {
    //     success: true,
    //     message: 'Task Created Successfully',
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: error.message,
    //   };
    // }

     return this.taskService.create(createTaskDto,user);
  }
  @UseGuards(JwtAuthGuard)
  //@Roles(Role.Admin)
  @Get()
  async findTaskAll(@Request() {user}:any) {
   
   return this.taskService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findTaskOne(@Param('id') id: string,@Request() {user}:any) {
    return this.taskService.findOne(+id,user);
  }
  @UseGuards(JwtAuthGuard)   
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,user:UserEntity) {
    return this.taskService.update(+id, updateTaskDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Request() {user}:any) {
    return this.taskService.remove(+id,user);
  }
}
