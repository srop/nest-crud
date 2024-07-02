import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModule,TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],

})
export class TaskModule {}
