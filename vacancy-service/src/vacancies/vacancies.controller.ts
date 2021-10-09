import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './schemas/vacancy.schema';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from '@@auth/guards/auth.guard';
import { Role } from '@@enums/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async createVacancy(
    @Body() createVacancyDto: CreateVacancyDto,
  ): Promise<Vacancy> {
    return await this.vacanciesService.create(createVacancyDto);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<Vacancy[]> {
    return this.vacanciesService.findAll();
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Vacancy> {
    return this.vacanciesService.findById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    return this.vacanciesService.update(id, updateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(id);
  }
}
