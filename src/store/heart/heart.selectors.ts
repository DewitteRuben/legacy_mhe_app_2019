import { StoreState } from "../store.types";

const getHeartRate = (state: StoreState) => state.heart.currentHeartRate;

const getCoherence = (state: StoreState) => state.heart.currentCoherence;

const getMaxCoherence = (state: StoreState) => state.heart.maxCoherence;

export { getHeartRate, getCoherence, getMaxCoherence };
