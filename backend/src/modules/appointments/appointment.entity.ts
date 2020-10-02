import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from '@shared/base.entity';
import { User } from '../users/user.entity';

@Entity('appointments')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'barber_id' })
  barber: User;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User;
}
