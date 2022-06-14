import { IPlagueID, IPlaguePlot } from "./plaguePlot.interface";

export interface PointsInfoInterface {
    id: number;
    plagePlotID: IPlaguePlot;
    observation: string;
}

export interface PointsInterface {
    lng: number,
    lat: number,
}
