import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import uuid4 from "uuid/v4";
import {
  addMoodEntry as apiAddMoodEntry,
  getMoodEntriesByUserId
} from "../../services/api";
import {
  clearLocalMoodEntries,
  getLocalMoodEntries,
  setLocalMoodEntry
} from "../../services/localStorage";
import { StoreState } from "../store.types";
import {
  AddMoodEntryAction,
  FetchMoodEntryErrorAction,
  FetchMoodEntryPendingAction,
  FetchMoodEntrySuccessAction,
  LogActionTypes,
  MoodEntry,
  SetMoodEntriesAction
} from "./log.types";

type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>;

// const saveCycleFrequency = (frequency: string): ThunkResult<void> => (
//   dispatch,
//   getState
// ) => {
//   const { session } = getState();

//   const cycleData = {
//     freq: frequency,
//     timing: {
//       bIn: session.bIn,
//       bOut: session.bOut,
//       rest: session.rest,
//       hold: session.hold
//     }
//   };
//   dispatch(setCycleFrequency(frequency));
//   AsyncStorage.setItem(STORAGE_CYCLE_DATA, JSON.stringify(cycleData));
// };

// const saveCustomCycleTiming = (
//   target: "bIn" | "hold" | "bOut" | "rest",
//   value: number
// ): ThunkResult<void> => (dispatch, getState) => {
//   const { session } = getState();

//   dispatch(setCustomCycleTiming({ target, value }));
//   const cycleData: { [key: string]: any } = {
//     freq: session.frequency,
//     timing: {
//       bIn: session.bIn,
//       bOut: session.bOut,
//       rest: session.rest,
//       hold: session.hold
//     }
//   };
//   cycleData.timing[target] = value;
//   AsyncStorage.setItem(STORAGE_CYCLE_DATA, JSON.stringify(cycleData));
// };

const setMoodEntries: ActionCreator<SetMoodEntriesAction> = (
  value: MoodEntry[]
) => ({
  value,
  type: LogActionTypes.SET_MOOD_ENTRIES
});

const fetchMoodEntries = (): ThunkResult<void> => async dispatch => {
  dispatch(fetchMoodEntriesPending());
  let moodEntries = [];
  try {
    moodEntries = await getMoodEntriesByUserId("userid");
    dispatch(setMoodEntries(moodEntries));
    dispatch(addAllEntriesToLocal(moodEntries));
    dispatch(fetchMoodEntriesSuccess());
  } catch (error) {
    dispatch(fetchMoodEntriesError(error));
  }
};

const fetchLocalMoodEntries = (): ThunkResult<void> => async dispatch => {
  dispatch(fetchMoodEntriesPending());
  let localMoodEntries = [];
  try {
    localMoodEntries = await getLocalMoodEntries();
    dispatch(setMoodEntries(localMoodEntries));
    dispatch(fetchMoodEntriesSuccess());
  } catch (error) {
    dispatch(fetchMoodEntriesError(error));
  }
};

const addAllEntriesToLocal = (
  moodEntries: MoodEntry[]
): ThunkResult<void> => async dispatch => {
  dispatch(fetchMoodEntriesPending());
  try {
    setLocalMoodEntry(moodEntries);
    dispatch(fetchMoodEntriesSuccess());
  } catch (error) {
    dispatch(fetchMoodEntriesError(error));
  }
};

const fetchAddMoodEntry = (moodEntry: MoodEntry): ThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    await apiAddMoodEntry(moodEntry);
    return Promise.resolve();
  } catch (error) {
    dispatch(fetchMoodEntriesError(error));
    return Promise.reject(error);
  }
};

const addLocalMoodEntry = (moodEntry: MoodEntry): ThunkResult<void> => async (
  dispatch,
  getState
) => {
  dispatch(fetchMoodEntriesPending());
  const { moodEntries } = getState().log;
  try {
    moodEntry.entryId = uuid4();
    dispatch(addMoodEntry(moodEntry));
    await setLocalMoodEntry([...moodEntries, moodEntry]);
    global.syncManager.sync();
    dispatch(fetchMoodEntriesSuccess());
    return Promise.resolve();
  } catch (error) {
    dispatch(fetchMoodEntriesError(error));
    return Promise.reject(error);
  }
};

const fetchMoodEntriesSuccess: ActionCreator<
  FetchMoodEntrySuccessAction
> = () => ({
  type: LogActionTypes.MOOD_ENTRIES_SUCCESS
});

const addMoodEntry: ActionCreator<AddMoodEntryAction> = (value: MoodEntry) => ({
  value,
  type: LogActionTypes.ADD_MOOD_ENTRY
});

const fetchMoodEntriesError: ActionCreator<FetchMoodEntryErrorAction> = (
  error: any
) => ({
  error,
  type: LogActionTypes.MOOD_ENTRIES_ERROR
});

const fetchMoodEntriesPending: ActionCreator<
  FetchMoodEntryPendingAction
> = () => ({
  type: LogActionTypes.MOOD_ENTRIES_LOADING
});

export {
  setMoodEntries,
  addMoodEntry,
  fetchMoodEntries,
  addLocalMoodEntry,
  fetchAddMoodEntry,
  fetchLocalMoodEntries
};
