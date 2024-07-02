import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async create(createTaskDto: CreateTaskDto, user: UserEntity) {
    const { title, description } = createTaskDto;
    // console.log("service:",user);

    
  //  
    const data = await this.taskRepository.create({
      title,
      description,
      user,
    });
    
    console.log("datadatadata:",data)
    await this.taskRepository.save(data);
    return data
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  findOne(id: number, user: UserEntity) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto, user: UserEntity) {
    return `This action updates a #${id} task`;
  }

  remove(id: number, user: UserEntity) {
    return `This action removes a #${id} task`;
  }
}
