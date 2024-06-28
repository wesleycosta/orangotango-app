import { ReservationStatus } from './reservation-status.enum';

export abstract class ReservationBaseModel {
    id!: string;
    guestName!: string;
    guestEmail!: string;
    checkIn!: Date;
    checkOut!: Date;
    value!: number;
    adults!: number;
    children!: number;
    status!: ReservationStatus;
    roomId!: string;
}