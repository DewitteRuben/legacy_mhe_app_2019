import { Action } from "redux";

export enum LogActionTypes {
  SET_MOOD_ENTRIES = "@log/SET_MOOD_ENTRIES",
  ADD_MOOD_ENTRY = "@log/ADD_MOOD_ENTRY",
  SET_STATE = "@log/SET_STATE",
  MOOD_ENTRIES_LOADING = "@log/MOOD_ENTRIES_LOADING",
  MOOD_ENTRIES_ERROR = "@log/MOOD_ENTRIES_ERROR",
  MOOD_ENTRIES_SUCCESS = "@log/MOOD_ENTRIES_SUCCESS"
}

export interface SetMoodEntriesAction extends Action {
  value: MoodEntry[];
}
export interface AddMoodEntryAction extends Action {
  value: MoodEntry;
}

export interface FetchMoodEntryPendingAction extends Action {}
export interface FetchMoodEntrySuccessAction extends Action {}

export interface FetchMoodEntryErrorAction extends Action {
  error: any;
}

export interface MoodEntry {
  date: Date;
  userId: string;
  entryId: string;
  mood: string;
  emotions: string[];
  thoughts: string;
  experiences: string[];
}

export interface LogState {
  moodEntries: MoodEntry[];
  loading: boolean;
  error: any;
}
