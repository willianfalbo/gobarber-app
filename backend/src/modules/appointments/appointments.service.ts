import { startOfHour } from 'date-fns';
import { injectable, inject, container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import HttpException from '@shared/http-exception.model';
import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/user.entity';
import { Appointment } from './appointment.entity';
import { IAppointmentsRepository } from './interfaces/appointments-repository.interface';
import { IAppointmentsService } from './interfaces/appointments-service.interface';

@injectable()
export class AppointmentsService implements IAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository,
  ) { }

  public async create({ barberId, date, customerId }: Appointment): Promise<Appointment> {
    const userService = container.resolve(UsersService);
    const barber = await userService.findById({ id: barberId } as User, false);
    console.log('barber', barber);
    if (!barber) {
      throw new HttpException('Barber not found.', StatusCodes.NOT_FOUND);
    }

    const appointmentDate = startOfHour(date);

    const appointmentFound = await this.repository.findByDate({
      date: appointmentDate,
    } as Appointment);

    if (appointmentFound) {
      throw new HttpException('This date/time is already booked.');
    }

    const appointment = await this.repository.save({
      barberId,
      date: appointmentDate,
      customerId,
    } as Appointment);

    return appointment;
  }

  public async listByCustomerId({ customerId }: Appointment): Promise<Appointment[]> {
    return this.repository.findByCustomerId({ customerId } as Appointment);
  }
}
