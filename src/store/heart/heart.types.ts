import { Action } from "redux";

export enum HeartActionTypes {
	ADD_HEART_RATE = "@heart/ADD_HEART_RATE",
	RESET_HEART_DATA = "@heart/RESET_HEART_DATA",
}

export interface AddHeartRateAction extends Action {
	rate: any;
}

export interface HeartState {
	heartRates: number[];
	currentHeartRate: number | null;
	currentCoherence: number | null;
	maxCoherence: number | null;
}
