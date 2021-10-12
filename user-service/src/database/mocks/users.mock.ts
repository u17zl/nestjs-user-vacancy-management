import { User } from '@@users/schemas/user.schema';

const data = <User[]>[
  {
    _id: '5e5df7f450571fb3aecdcf21',
    companyId: '5e5df7fc6953acd3dc50fe8f',
    name: 'Bob Markle',
    username: 'bob',
    password: 'bob',
    role: 'user',
  },
  {
    _id: '5e5df7f450571fb3aecdcf22',
    companyId: '5e5df7fc6953acd3dc50fe8f',
    name: 'Mark Smith',
    username: 'mark',
    password: 'mark',
    role: 'admin',
  },
];
export default data;