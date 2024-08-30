import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Property } from 'src/property/property.entity';
import { Payment } from 'src/payment/payment.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactDetails: string;

  @Column()
  unit: string;

  @ManyToOne(() => Property, (property) => property.tenants)
  property: Property;

  @OneToMany(() => Payment, (payment) => payment.tenant)
  payments: Payment[];
}
