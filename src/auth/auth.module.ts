import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RefreshJwtStrategy } from './jwt/refresh.strategy';
@Module({
  // imports: [
  //   TypeOrmModule.forFeature([UserEntity]),
  // ],
  imports: [
    UserModule,
    PassportModule,
  
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'testtest',
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,UserService,RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
