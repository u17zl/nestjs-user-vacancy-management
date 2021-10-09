import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  expiredAt: Date;
}