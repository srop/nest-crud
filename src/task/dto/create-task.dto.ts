import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  // create-user-dto
  export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
  }
  