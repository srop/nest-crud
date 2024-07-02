
import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  saltOrRounds: number = 10;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const hashPass = await bcrypt.hash(createUserDto.password, this.saltOrRounds)
    let data = {
      ...createUserDto,
      password: hashPass
    }

    const userData =
      await this.userRepository.create(
        data,
      );
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userData =
      await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }
  async findOneUsername(username: string): Promise<UserEntity> {
    const userData =
      await this.userRepository.findOneBy({ username });
    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    return await this.userRepository.save(
      userData,
    );
  }

  async remove(id: number): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
     await this.userRepository.delete(
      existingUser,
    );
    return existingUser
  }
}
