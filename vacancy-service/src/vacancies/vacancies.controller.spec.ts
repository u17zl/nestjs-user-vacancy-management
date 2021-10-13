import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Vacancy } from '@@vacancies/schemas/vacancy.schema';
import { VacanciesController } from '@@vacancies/vacancies.controller';
import { VacanciesService } from '@@vacancies/vacancies.service';
import mockVacancies from '@@database/mocks/vacancies.mock';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from '@@auth/guards/auth.guard';

jest.mock('@@vacancies/vacancies.service');

describe('VacanciesController', () => {
  describe('Admin Role', () => {
    let vacanciesController: VacanciesController;
    let vacanciesService: VacanciesService;
    let mockVacancy: Vacancy;
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [],
        controllers: [VacanciesController],
        providers: [
          VacanciesService,
          {
            provide: 'AUTH_CLIENT',
            useValue: null,
          },
        ],
      })
        .overrideGuard(JwtAuthGuard)
        .useValue({
          canActivate: (context: ExecutionContext) => {
            const target = context.getHandler();
            Reflect.defineMetadata('user_role', 'user', target);
            return true;
          },
        })
        .overrideGuard(RolesGuard)
        .useValue({
          canActivate: jest.fn(() => true),
        })
        .compile();

      vacanciesController =
        moduleRef.get<VacanciesController>(VacanciesController);
      vacanciesService = moduleRef.get<VacanciesService>(VacanciesService);
      mockVacancy = mockVacancies[0];
      Reflect.defineMetadata('user_role', 'user', VacanciesController);

      jest.clearAllMocks();
    });

    it('vacanciesController should be defined', () => {
      expect(vacanciesController).toBeDefined();
    });

    it('vacanciesService should be defined', () => {
      expect(vacanciesService).toBeDefined();
    });

    it('mockVacancy should be defined', () => {
      expect(mockVacancy).toBeDefined();
    });

    describe('can getVacancy', () => {
      describe('when getVacancy is called', () => {
        let vacancy: Vacancy;

        beforeEach(async () => {
          vacancy = await vacanciesController.findById(mockVacancy._id);
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.findById).toBeCalledWith(mockVacancy._id);
        });
      });
    });

    describe('getVacancies', () => {
      describe('when getVacancies is called', () => {
        let vacancies: Vacancy[];

        beforeEach(async () => {
          vacancies = await vacanciesController.findAll();
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.find).toBeCalled();
        });
      });
    });

    describe('can create Vacancy', () => {
      describe('when create is called', () => {
        let createVacancyDto: CreateVacancyDto;
        beforeEach(async () => {
          createVacancyDto = {
            title: 'Frontend',
            description: 'Senior',
            companyId: '5e5df7fc6953acd3dc50fe8f',
            expiredAt: new Date('2021-10-31T21:38:56.705Z'),
          };
          await vacanciesController.createVacancy(createVacancyDto);
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.create).toHaveBeenCalled();
        });
      });
    });

    describe('can update Vacancy', () => {
      describe('when update is called', () => {
        let updateVacancyDto: UpdateVacancyDto;
        beforeEach(async () => {
          updateVacancyDto = {
            _id: '5e5df7fc6953acd3dc50fe8f',
            title: 'Frontend',
            description: 'Senior',
            companyId: '5e5df7fc6953acd3dc50fe8f',
            expiredAt: new Date('2021-10-31T21:38:56.705Z'),
          };
          await vacanciesController.update(
            updateVacancyDto._id,
            updateVacancyDto,
          );
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.update).toHaveBeenCalled();
        });
      });
    });

    describe('can remove Vacancy', () => {
      describe('when remove is called', () => {
        beforeEach(async () => {
          await vacanciesController.remove(mockVacancy._id);
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.remove).toHaveBeenCalled();
        });
      });
    });
  });

  describe('User Role', () => {
    let vacanciesController: VacanciesController;
    let vacanciesService: VacanciesService;
    let mockVacancy: Vacancy;
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [],
        controllers: [VacanciesController],
        providers: [
          VacanciesService,
          {
            provide: 'AUTH_CLIENT',
            useValue: null,
          },
        ],
      })
        .overrideGuard(JwtAuthGuard)
        .useValue({
          canActivate: (context: ExecutionContext) => {
            const target = context.getHandler();
            Reflect.defineMetadata('user_role', 'user', target);
            return true;
          },
        })
        .overrideGuard(RolesGuard)
        .useValue({
          canActivate: jest.fn(() => false),
        })
        .compile();

      vacanciesController =
        moduleRef.get<VacanciesController>(VacanciesController);
      vacanciesService = moduleRef.get<VacanciesService>(VacanciesService);
      mockVacancy = mockVacancies[0];

      jest.clearAllMocks();
    });

    describe('cannot create Vacancy', () => {
      describe('when create is called', () => {
        let createVacancyDto: CreateVacancyDto;
        beforeEach(async () => {
          createVacancyDto = {
            title: 'Frontend',
            description: 'Senior',
            companyId: '5e5df7fc6953acd3dc50fe8f',
            expiredAt: new Date('2021-10-31T21:38:56.705Z'),
          };
          await vacanciesController.createVacancy(createVacancyDto);
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.create).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('cannot update Vacancy', () => {
      describe('when update is called', () => {
        let updateVacancyDto: UpdateVacancyDto;
        beforeEach(async () => {
          updateVacancyDto = {
            _id: '5e5df7fc6953acd3dc50fe8f',
            title: 'Frontend',
            description: 'Senior',
            companyId: '5e5df7fc6953acd3dc50fe8f',
            expiredAt: new Date('2021-10-31T21:38:56.705Z'),
          };
          await vacanciesController.update(
            updateVacancyDto._id,
            updateVacancyDto,
          );
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.update).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('cannot remove Vacancy', () => {
      describe('when remove is called', () => {
        beforeEach(async () => {
          await vacanciesController.remove(mockVacancy._id);
        });

        test('then it should call vacanciesService', () => {
          expect(vacanciesService.remove).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
