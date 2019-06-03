import { AsyncStorage } from "react-native";
import store from "../../store";
import { MoodEntry } from "../../store/log";
import { safelyParseJSON, safelyStringifyJSON } from "../../utils/json";

const STORAGE_KEYS = {
  ALL_MOOD_ENTRIES: "ALL_MOOD_ENTRIES",
  LAST_KNOWN_ENTRY: "LAST_KNOWN_ENTRY",
  CLIENT_JWT_TOKEN: "CLIENT_JWT_TOKEN",
  CLIENT_USERID: "CLIENT_USERID"
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

export const setLastKnownId = (id: string) => {
  AsyncStorage.setItem(STORAGE_KEYS.LAST_KNOWN_ENTRY, id);
};

export const setJWTToken = (token: string) => {
  AsyncStorage.setItem(STORAGE_KEYS.CLIENT_JWT_TOKEN, token);
};

export const setUserId = (userId: string) => {
  AsyncStorage.setItem(STORAGE_KEYS.CLIENT_USERID, userId);
};

export const getUserId = () => {
  return AsyncStorage.getItem(STORAGE_KEYS.CLIENT_USERID);
};

export const getJWTToken = () => {
  return AsyncStorage.getItem(STORAGE_KEYS.CLIENT_JWT_TOKEN);
};

export const getLastKnownMoodEntry = () => {
  return AsyncStorage.getItem(STORAGE_KEYS.LAST_KNOWN_ENTRY);
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
