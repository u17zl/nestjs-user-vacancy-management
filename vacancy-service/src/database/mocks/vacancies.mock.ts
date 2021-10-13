import { Vacancy } from '@@vacancies/schemas/vacancy.schema';
import { name as fakerName, date as fakerDate } from 'faker';

const data = <Vacancy[]>[
    {
      companyId: '5e5df7fc6953acd3dc50fe8f',
      title: fakerName.jobTitle(),
      description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
      expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
    },
    {
      companyId: '5e5df7fc6953acd3dc50fe8f',
      title: fakerName.jobTitle(),
      description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
      expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
    },
    {
      companyId: '5e5df7fc6953acd3dc50fe8f',
      title: fakerName.jobTitle(),
      description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
      expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
    },
    {
      companyId: '5e5df7fc6953acd3dc50fe8f',
      title: fakerName.jobTitle(),
      description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
      expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
    },{
      companyId: '5e5df7fc6953acd3dc50fe8f',
      title: fakerName.jobTitle(),
      description: fakerName.jobDescriptor() + ' ' + fakerName.jobArea(),
      expiredAt: fakerDate.between('2021-10-01', '2021-11-01'),
    }
  ];
export default data;