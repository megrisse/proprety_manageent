import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  create(propertyData: Partial<Property>): Promise<Property> {
    const property = this.propertyRepository.create(propertyData);
    return this.propertyRepository.save(property);
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find({ relations: ['tenants'] });
  }

  findOne(id: number): Promise<Property> {
    return this.propertyRepository.findOne({
      where: { id },
      relations: ['tenants'],
    });
  }

  update(id: number, propertyData: Partial<Property>): Promise<void> {
    return this.propertyRepository
      .update(id, propertyData)
      .then(() => undefined);
  }

  delete(id: number): Promise<void> {
    return this.propertyRepository.delete(id).then(() => undefined);
  }
}
