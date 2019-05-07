import { AsyncStorage } from "react-native";
import { safelyParseJSON, safelyStringifyJSON } from "../../utils/json";

const STORAGE_KEYS = {
  ALL_MOOD_ENTRIES: "ALL_MOOD_ENTRIES"
};

export const getLocalMoodEntries = async () => {
  return getJSON(STORAGE_KEYS.ALL_MOOD_ENTRIES);
};
export const setLocalMoodEntry = async (allEntries: object) => {
  return setJSON(allEntries, STORAGE_KEYS.ALL_MOOD_ENTRIES);
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
