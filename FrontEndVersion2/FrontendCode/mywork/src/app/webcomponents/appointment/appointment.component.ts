import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { CreateAppointmentDTO } from '../../services/appointment/appointment.model';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTimepickerModule } from '@angular/material/timepicker';  // Import MatTimepickerModule
import { provideNativeDateAdapter } from '@angular/material/core';  // Import the DateAdapter provider

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTimepickerModule,  
  ],  
  providers: [provideNativeDateAdapter()]  
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentStatuses = ['PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELED'];
  timeSlots: string[] = []; 
  reasons = ['Consultation', 'Follow-up', 'Vaccination', 'Check-up']; 

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      reason: ['', [Validators.required]],
      status: ['', [Validators.required]],
      childId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      vaccineId: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
   
    this.generateTimeSlots();
  }

  
  generateTimeSlots() {
    const startTime = 9; 
    const endTime = 18; 
    const interval = 30; 
    const slots: string[] = [];

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedTime = this.formatTime(hour, minute);
        slots.push(formattedTime);
      }
    }

    this.timeSlots = slots;
  }

 
  formatTime(hour: number, minute: number): string {
    let period = 'AM';
    let formattedHour = hour;

    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        formattedHour = hour - 12; 
      }
    } else if (hour === 0) {
      formattedHour = 12; 
    }

    
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    
    return `${this.formatTimeUnit(formattedHour)}:${formattedMinute} ${period}`;
  }

 
  formatTimeUnit(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

 
  submitAppointment(): void {
    console.log("Button clicked, submitAppointment called");
    
    if (this.appointmentForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      console.log('Form is invalid:', this.appointmentForm.valid);
       return;
    }

    const newAppointment: CreateAppointmentDTO = {
      reason: this.appointmentForm.value.reason,
      status: this.appointmentForm.value.status,
      childId: this.appointmentForm.value.childId,
      doctorId: this.appointmentForm.value.doctorId,
      vaccineId: this.appointmentForm.value.vaccineId,
      appointmentDate: this.appointmentForm.value.appointmentDate,
      appointmentTime: this.appointmentForm.value.appointmentTime,
    };

    this.appointmentService.createAppointment(newAppointment).subscribe(
      (response) => {  
        this.toastr.success('Appointment created successfully!', 'Success');
        this.router.navigate(['/home']); 
      },
      (error) => {
        this.toastr.error('Creation failed: ' + error.message, 'Error');
      }
    );
    
  }
}
