import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Appointment, AppointmentService } from '../../../../models/appointment';
import { UserService } from '../../../../services/user.service';
import { ApointmentService } from '../../../../services/appointment.service';

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [],
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent implements OnInit {
  users:User[]=[]
  createForm!:FormGroup
  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private appointmentService:ApointmentService,
    private userService:UserService){}
  ngOnInit(): void {
    this.getAllUsers()
  }

  createCreateForm(){
    this.createForm=this.formBuilder.group({
      fullName:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.required],
      userId:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      completed: ['', Validators.required],


    })
  }
  getAllUsers(){
    this.userService.getAll().subscribe(res=>{
      this.users=res.data;
    })
  }
  onSubmit(){
    if(!this.createForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }
    let appointment:Appointment=Object.assign({},this.createForm.value);
    this.appointmentService.create(appointment).subscribe(result=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }

}
