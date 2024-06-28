import { ReservationBaseModel } from "./reservation-base.model";

export interface ReservationFullModel extends ReservationBaseModel {
    id: string;
    roomName: string;
    statusName: string;
}