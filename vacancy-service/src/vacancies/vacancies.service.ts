import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Vacancy } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancy.name) private vacancyModel: Model<Vacancy>,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const createdVacancy = new this.vacancyModel(createVacancyDto);
    return createdVacancy.save();
  }

  async find(query?): Promise<Vacancy[]> {
    return this.vacancyModel.find(query);
  }

  async findById(id: string): Promise<Vacancy> {
    try {
      const vacancy = await this.vacancyModel.findById(id);
      if (!vacancy) {
        throw new NotFoundException();
      }
      return vacancy;
    } catch {
      throw new BadRequestException();
    }
  }

  async update(
    id: string,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    return this.vacancyModel.findByIdAndUpdate(id, updateVacancyDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Vacancy> {
    try {
      const vacancy = await this.vacancyModel.findByIdAndDelete(id);
      if (!vacancy) {
        throw new NotFoundException();
      }
      return vacancy;
    } catch {
      throw new BadRequestException();
    }
  }

  async batchCreate(data: CreateVacancyDto[]) {
    return this.vacancyModel.create(data);
  }

  async batchDelete(_ids: string[]) {
    return this.vacancyModel.deleteMany({ _id: { $in: _ids } });
  }
}
