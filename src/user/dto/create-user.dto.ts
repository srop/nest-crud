import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

// create-user-dto
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
   roles: Role;

  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
