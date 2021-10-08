import * as bcrypt from 'bcrypt';

import { User, UserSchema } from './user.schema';

export const UserSchemaProvider = {
  name: User.name,
  useFactory: () => {
    const schema = UserSchema;
    schema.pre<User>('save', function (next: Function) {
      if (this.password) {
        bcrypt.hash(this.password, 10, (err, hash) => {
          if (err) return next(err);
          this.password = hash;
          next();
        });
      }
    });
    return schema;
  },
};
