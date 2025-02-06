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
    MatSelectModule, // Include MatSelectModule here
    MatDatepickerModule,
    MatIconModule,
    MatTimepickerModule,  // Add MatTimepickerModule here
  ],  
  providers: [provideNativeDateAdapter()]  // Provide the Native DateAdapter here
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentStatuses = ['PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELED'];
  timeSlots: string[] = []; // Array to hold time slots
  reasons = ['Consultation', 'Follow-up', 'Vaccination', 'Check-up']; // Example reasons

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
    // Generate time slots when the component is initialized
    this.generateTimeSlots();
  }

  // Function to generate time slots from 9 AM to 6 PM with 30-minute intervals (AM/PM format)
  generateTimeSlots() {
    const startTime = 9; // 9 AM
    const endTime = 18; // 6 PM
    const interval = 30; // 30-minute interval
    const slots: string[] = [];

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedTime = this.formatTime(hour, minute);
        slots.push(formattedTime);
      }
    }

    this.timeSlots = slots;
  }

  // Helper function to format time to 12-hour format with AM/PM
  formatTime(hour: number, minute: number): string {
    let period = 'AM';
    let formattedHour = hour;

    // Convert 24-hour time to 12-hour time and AM/PM
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        formattedHour = hour - 12; // Convert 13-23 to 1-11 PM
      }
    } else if (hour === 0) {
      formattedHour = 12; // Midnight case
    }

    // Format the minutes to be always 2 digits (e.g., '05' for 5 minutes)
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    // Return formatted time (e.g., 09:30 AM or 03:00 PM)
    return `${this.formatTimeUnit(formattedHour)}:${formattedMinute} ${period}`;
  }

  // Helper function to format single digit hour to double digit (e.g., 9 to 09)
  formatTimeUnit(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  // Submit the appointment form
  submitAppointment(): void {
    if (this.appointmentForm.invalid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
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
        this.router.navigate(['/home']); // Redirect to home or appointment list
      },
      (error) => {
        this.toastr.error('Creation failed: ' + error.message, 'Error');
      }
    );
  }
}
