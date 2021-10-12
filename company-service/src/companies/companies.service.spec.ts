import * as mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompaniesService } from './companies.service';

import { CreateCompanyDto } from './dto/create-company.dto';
import mockCompanies from '@@database/mocks/companies.mock';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let companyModel;
  let mockCompany: Company;

  beforeEach(async () => {
    companyModel = mongoose.model(Company.name, CompanySchema);
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getModelToken(Company.name),
          useValue: companyModel,
        },
      ],
    }).compile();

    service = moduleRef.get<CompaniesService>(CompaniesService);
    mockCompany = mockCompanies[0];
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('companyModel should be defined', () => {
    expect(companyModel).toBeDefined();
  });

  it('mockCompany should be defined', () => {
    expect(mockCompany).toBeDefined();
  });

  it('should call the companyModel findOne', () => {
    const findOne = jest.spyOn(companyModel, 'findOne');
    service.findById(mockCompany._id);
    expect(findOne).toBeCalled();
  });

  it(' should call the companyModel find', () => {
    const find = jest.spyOn(companyModel, 'find');
    service.find();
    expect(find).toBeCalled();
  });

  test('then it should call the companyModel create', () => {
    let createCompanyDto: CreateCompanyDto;
    createCompanyDto = mockCompany;
    const create = jest.spyOn(companyModel.prototype, 'save');
    service.create(createCompanyDto);

    expect(create).toBeCalledTimes(1);
  });
});
