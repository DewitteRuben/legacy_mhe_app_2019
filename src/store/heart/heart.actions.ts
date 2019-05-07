import { Action, ActionCreator } from "redux";
import { AddHeartRateAction, HeartActionTypes } from "./heart.types";

const addHeartRate: ActionCreator<AddHeartRateAction> = (rate: number) => ({
	rate,
	type: HeartActionTypes.ADD_HEART_RATE,
});

const resetHeartData: ActionCreator<Action> = () => ({
	type: HeartActionTypes.RESET_HEART_DATA,
});

export { addHeartRate, resetHeartData };
