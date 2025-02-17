import { Module, NestModule ,MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from  './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { LoggerMiddleware } from './logger.middleware';
import { UserController } from './user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/local/roles.guard';
@Module({
  
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
     useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // entities: [Task,Task1],
        // autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        entities: [UserEntity],
      }),
    }),

    UserModule,
    AuthModule,
    TaskModule,



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}