import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsNotEmpty()
    companyId: string;

    @IsNotEmpty()
    @IsEnum({
        ADMIN: 'admin',
        USER: 'user',
      })
    role: string;
  }