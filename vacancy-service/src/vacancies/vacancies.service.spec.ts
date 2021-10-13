import * as mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';
import { VacanciesService } from './vacancies.service';

import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import mockVacancies from '@@database/mocks/vacancies.mock';

describe('VacanciesService', () => {
  let service: VacanciesService;
  let vacancyModel;
  let mockVacancy: Vacancy;

  beforeEach(async () => {
    vacancyModel = mongoose.model(Vacancy.name, VacancySchema);
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        {
          provide: getModelToken(Vacancy.name),
          useValue: vacancyModel,
        },
      ],
    }).compile();

    service = moduleRef.get<VacanciesService>(VacanciesService);
    mockVacancy = mockVacancies[0];
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('vacancyModel should be defined', () => {
    expect(vacancyModel).toBeDefined();
  });

  it('mockVacancy should be defined', () => {
    expect(mockVacancy).toBeDefined();
  });

  it('should call the vacancyModel findOne', () => {
    const findOne = jest.spyOn(vacancyModel, 'findOne');
    service.findById(mockVacancy._id);
    expect(findOne).toBeCalled();
  });

  it(' should call the vacancyModel find', () => {
    const find = jest.spyOn(vacancyModel, 'find');
    service.find();
    expect(find).toBeCalled();
  });

  test('then it should call the vacancyModel create', () => {
    let createVacancyDto: CreateVacancyDto;
    createVacancyDto = mockVacancy;
    const create = jest.spyOn(vacancyModel.prototype, 'save');
    service.create(createVacancyDto);

    expect(create).toBeCalledTimes(1);
  });

  test('then it should call the vacancyModel findByIdAndUpdate', () => {
    let updateVacancyDto: UpdateVacancyDto;
    updateVacancyDto = mockVacancy;
    const update = jest.spyOn(vacancyModel, 'findByIdAndUpdate');
    service.update(updateVacancyDto._id, updateVacancyDto);

    expect(update).toBeCalledTimes(1);
  });

  test('then it should call the vacancyModel findByIdAndDelete', () => {
    const remove = jest.spyOn(vacancyModel, 'findByIdAndDelete');
    service.remove(mockVacancy._id);

    expect(remove).toBeCalledTimes(1);
  });
});
