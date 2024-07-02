import { TaskEntity } from 'src/task/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type=>TaskEntity,tasks => tasks.user)
  task:TaskEntity
}
