import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  // constructor(
  //     @Inject('USER_SERVICE')
  //     private readonly userService: Repository<UserService>,
  //   ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async refreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
      
    };
  }
}
