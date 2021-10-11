import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesResolver } from './vacancies.resolver';
import { VacanciesService } from './vacancies.service';

describe('VacanciesResolver', () => {
  let resolver: VacanciesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacanciesResolver, VacanciesService],
    }).compile();

    resolver = module.get<VacanciesResolver>(VacanciesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
