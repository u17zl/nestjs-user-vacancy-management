import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    address: string;
  }