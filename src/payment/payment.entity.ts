import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tenant } from 'src/tenant/tenant.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datePaid: Date;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column({ default: false })
  isSettled: boolean;

  @ManyToOne(() => Tenant, (tenant) => tenant.payments)
  tenant: Tenant;
}
