import { AsyncStorage } from "react-native";
import store from "../../store";
import { MoodEntry } from "../../store/log";
import { safelyParseJSON, safelyStringifyJSON } from "../../utils/json";

const STORAGE_KEYS = {
  ALL_MOOD_ENTRIES: "ALL_MOOD_ENTRIES"
};

export const getLocalMoodEntries = async () => {
  const localMoodEntries = await getJSON(STORAGE_KEYS.ALL_MOOD_ENTRIES);
  if (localMoodEntries) {
    return localMoodEntries;
  }
  return [];
};

export const setLocalMoodEntry = async (moodEntries: MoodEntry[]) => {
  return setJSON(moodEntries, STORAGE_KEYS.ALL_MOOD_ENTRIES);
};

export const clearLocalMoodEntries = () => {
  AsyncStorage.removeItem(STORAGE_KEYS.ALL_MOOD_ENTRIES);
};

const setJSON = async (object: object, key: string) => {
  try {
    const jsonString = safelyStringifyJSON(object);
    if (jsonString) {
      await AsyncStorage.setItem(key, jsonString);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getJSON = async (key: string) => {
  try {
    const jsonString = await AsyncStorage.getItem(key);
    if (jsonString) {
      return safelyParseJSON(jsonString);
    }
  } catch (error) {
    throw new Error(error);
  }
};
