import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment, AppointmentService } from '../../../models/appointment';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { ApointmentService } from '../../../services/appointment.service';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { CommonModule } from '@angular/common';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule,AppointmentAddComponent,AppointmentUpdateComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  appointments:Appointment[]=[];
  selectedAppointment!:Appointment;
  @ViewChild(AppointmentAddComponent,{static:true}) addAppointmentComponent!: AppointmentAddComponent
  @ViewChild(AppointmentUpdateComponent,{static:true}) updateAppointmentComponent!:AppointmentUpdateComponent
  constructor(private appointmentService:ApointmentService,private userService:UserService){}

  users:User[]=[]
  ngOnInit(): void {
    this.getList();
    this.getUserList();
  }
  getList(){
    this.appointmentService.getAll().subscribe(res=>{
      this.appointments=res.data;
    });
  }
  findUserById(userId: number) {
    return this.users.find(user => user.id === userId);
  }
  getUserList(){
    this.userService.getAll().subscribe(res=>{
      this.users=res.data
    })
  }
  showAddModal(){
    this.addAppointmentComponent.createCreateForm();
  }
  showEditModal(appointment:Appointment|null){
    if(appointment==null) return;
    this.updateAppointmentComponent.createUpdateForm(appointment);
  }
  deleteAppointmentById(id:number){
    this.appointmentService.deleteById(id).subscribe(res=>{
      this.getList();
    })
  }

}
