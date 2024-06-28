export abstract class ReservationBaseModel {
    guestName!: string;
    guestEmail!: string;
    checkIn!: Date;
    checkOut!: Date;
    value!: number;
    adults!: number;
    children!: number;
    roomId!: string;
}