import { ReservationBaseModel } from "./reservation-base.model";
import { ReservationStatus } from "./reservation-status.enum";

export interface ReservationFullModel extends ReservationBaseModel {
    id: string;
    roomName: string;
    statusName: string;
    status: ReservationStatus;
}