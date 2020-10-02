import { Appointment } from '../appointment.entity';

export interface IAppointmentsService {
  create({ barberId, date, customerId }: Appointment): Promise<Appointment>;
  listByCustomerId({ customerId }: Appointment): Promise<Appointment[]>;
}
