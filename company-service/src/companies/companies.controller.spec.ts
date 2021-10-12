import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Company } from '@@companies/schemas/company.schema';
import { CompaniesController } from '@@companies/companies.controller';
import { CompaniesService } from '@@companies/companies.service';
import mockCompanies from '@@database/mocks/companies.mock';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '@@auth/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common';

jest.mock('@@companies/companies.service');

describe('CompaniesController', () => {
  let companiesController: CompaniesController;
  let companiesService: CompaniesService;
  let mockCompany: Company;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: 'AUTH_CLIENT',
          useValue: null,
        },
      ],
    }).overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        return true
      },
    }).compile();

    companiesController = moduleRef.get<CompaniesController>(CompaniesController);
    companiesService = moduleRef.get<CompaniesService>(CompaniesService);
    mockCompany = mockCompanies[0];

    jest.clearAllMocks();
  });

  it('companiesController should be defined', () => {
    expect(companiesController).toBeDefined();
  });

  it('companiesService should be defined', () => {
    expect(companiesService).toBeDefined();
  });

  it('mockCompany should be defined', () => {
    expect(mockCompany).toBeDefined();
  });

  describe('getCompany', () => {
    describe('when getCompany is called', () => {
      let company: Company;

      beforeEach(async () => {
        company = await companiesController.findOne(mockCompany._id);
      });

      test('then it should call companiesService', () => {
        expect(companiesService.findById).toBeCalledWith(mockCompany._id);
      });
    });
  });

  describe('getCompanies', () => {
    describe('when getCompanies is called', () => {
      let companies: Company[];

      beforeEach(async () => {
        companies = await companiesController.findAll();
      });

      test('then it should call companiesService', () => {
        expect(companiesService.find).toBeCalled();
      });
    });
  });

  describe('create Company', () => {
    describe('when create is called', () => {
      let createCompanyDto: CreateCompanyDto;
      beforeEach(async () => {
        createCompanyDto = {
          name: 'Amazon',
          address: 'Redfern 2015',
        };
        await companiesController.create(createCompanyDto);
      })

      test('then it should call companiesService', () => {
        expect(companiesService.create).toHaveBeenCalled();
      });
    });
  });
});
