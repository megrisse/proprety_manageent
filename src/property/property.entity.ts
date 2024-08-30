import { Tenant } from 'src/tenant/tenant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  type: string;

  @Column()
  units: number;

  @Column()
  rentalCost: number;

  @OneToMany(() => Tenant, (tenant) => tenant.property)
  tenants: Tenant[];
}
