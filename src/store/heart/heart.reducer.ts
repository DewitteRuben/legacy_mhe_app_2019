import HEART_INITIAL_STATE from "./heart.initial-state";

import {
  AddHeartRateAction,
  HeartActionTypes,
  HeartState
} from "./heart.types";

const languageReducer = (
  state: HeartState = HEART_INITIAL_STATE,
  action: AddHeartRateAction
) => {
  switch (action.type) {
    case HeartActionTypes.ADD_HEART_RATE: {
      // add current heartrate and only keep last 60 results
      const heartRates = [...state.heartRates, action.rate].slice(-60);
      // if more than 33 heartRates are in the history => calculate the coherence-% based on these last 30 rates
      // 3 uncalculable rates + 30 actual rates
      const currentCoherence = heartRates.length >= 33 ? 10 : null;

      return {
        ...state,
        heartRates,
        currentCoherence,
        currentHeartRate: 10,
        maxCoherence:
          (state.maxCoherence || 0) >= (currentCoherence || 0)
            ? state.maxCoherence
            : currentCoherence
      };
    }

    case HeartActionTypes.RESET_HEART_DATA:
      return HEART_INITIAL_STATE;

    default:
      return state;
  }
};

export default languageReducer;
