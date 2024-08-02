import { TaskEntity } from 'src/task/entities/task.entity';
import { Role } from 'src/enum/role.enum';
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

  @Column()
  roles: string

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   array: true,
  //   default :[Role.Admin]
  // })
 // public roles: Role[]
  @OneToMany(type=>TaskEntity,tasks => tasks.user)
  task:TaskEntity
}
