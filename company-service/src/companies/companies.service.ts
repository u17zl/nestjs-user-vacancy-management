import { Injectable } from '@nestjs/common';
import { Model, Mongoose } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}
  
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find();
  }

  async findById(id: string): Promise<Company> {
    return this.companyModel.findById(id);
  }

  async dropCollection(): Promise <void> {
    return this.companyModel.db.dropCollection('companies');
  }
}
