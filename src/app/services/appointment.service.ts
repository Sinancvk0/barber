import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ApointmentService extends BaseService<Appointment> {
  override path:string='appointments';


}
