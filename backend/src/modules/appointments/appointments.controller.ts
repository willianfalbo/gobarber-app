import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';

export class AppointmentsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(AppointmentsService);
    const appointments = await service.listByCustomerId({
      customerId: req.userId,
    } as Appointment);
    return res.json(appointments);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { barberId, date } = req.body;
    const parsedDate = parseISO(date);
    const service = container.resolve(AppointmentsService);
    const appointment = await service.create({
      barberId,
      date: parsedDate,
      customerId: req.userId,
    } as Appointment);
    return res.json(appointment);
  }
}
