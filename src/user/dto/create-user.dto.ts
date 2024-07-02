import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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
  @IsEmail()
  email: string;
}
