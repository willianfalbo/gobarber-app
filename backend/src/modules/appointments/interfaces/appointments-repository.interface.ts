import { Appointment } from '../appointment.entity';

export interface IAppointmentsRepository {
  findByDate({ date }: Appointment): Promise<Appointment | undefined>;
  findByCustomerId({ customerId }: Appointment): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<Appointment>;
}
