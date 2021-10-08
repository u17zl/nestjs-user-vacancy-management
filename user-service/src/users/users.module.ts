import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserSchemaProvider } from './schemas/user.schema.provider';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([UserSchemaProvider]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
