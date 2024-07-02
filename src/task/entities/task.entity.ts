import { UserEntity } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column({ unique: true })
    description: string;
  
    @CreateDateColumn()
    create: Date;
  
    @UpdateDateColumn()
    update: Date;
  
   @ManyToOne(type=>UserEntity,user => user.task)
   user:UserEntity
   
  }
  