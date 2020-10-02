import { getRepository, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { IAppointmentsRepository } from './interfaces/appointments-repository.interface';

export class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async findByDate({ date }: Appointment): Promise<Appointment | undefined> {
    return this.repository.findOne({ where: { date } });
  }

  public async findByCustomerId({ customerId }: Appointment): Promise<Appointment[]> {
    return this.repository.find({ where: { customerId } });
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.repository.save(appointment);
  }
}
