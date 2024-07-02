import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local.guard';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshJwtAuthGuard } from './jwt/refresh-jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService , private userService:UserService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

   @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);    
  }
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
   
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
