// src/app/appointment/appointment.model.ts
export interface AppointmentDTO {
  appointmentId: number;
  reason: string;
  status: 'PENDING'|'SCHEDULED'|'COMPLETED'|'CANCELED';
  childId: number;
  doctorId: number;
  vaccineId: number;
  appointmentDate: string;
  appointmentTime: string;
}

export interface CreateAppointmentDTO {
  reason: string;
  status: 'PENDING'|'SCHEDULED'|'COMPLETED'|'CANCELED';
  childId: number;
  doctorId: number;
  vaccineId: number;
  appointmentDate: string;
  appointmentTime: string;
}
