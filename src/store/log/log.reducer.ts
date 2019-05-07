import LOGS_INITIAL_STATE from "./log.initial-state";

import {
  AddMoodEntryAction,
  FetchMoodEntryErrorAction,
  LogActionTypes,
  LogState,
  SetMoodEntriesAction
} from "./log.types";

const languageReducer = (
  state: LogState = LOGS_INITIAL_STATE,
  action: SetMoodEntriesAction | AddMoodEntryAction | FetchMoodEntryErrorAction
) => {
  switch (action.type) {
    case LogActionTypes.SET_MOOD_ENTRIES: {
      return {
        ...state,
        error: null,
        loading: false,
        moodEntries: [...(action as SetMoodEntriesAction).value]
      };
    }

    case LogActionTypes.ADD_MOOD_ENTRY:
      return {
        ...state,
        moodEntries: [
          ...state.moodEntries,
          (action as AddMoodEntryAction).value
        ]
      };

    case LogActionTypes.MOOD_ENTRIES_LOADING:
      return {
        ...state,
        loading: true
      };

    case LogActionTypes.MOOD_ENTRIES_ERROR:
      return {
        ...state,
        loading: false,
        error: (action as FetchMoodEntryErrorAction).error
      };

    case LogActionTypes.MOOD_ENTRIES_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };

    default:
      return state;
  }
};

export default languageReducer;
