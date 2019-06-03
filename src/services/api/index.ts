import fetch from "../../utils/fetch";
import { getJWTToken } from "../localStorage";
import { MoodEntry } from "../../store/log";
const apiUrl = "http://192.168.178.34:3000/api";

export const getMoodEntriesByUserId = async (userId: string) => {
  const jwtToken = (await getJWTToken()) || "";

  return fetch(`${apiUrl}/mood/${userId}`, {
    headers: {
      authorization: `Bearer ${jwtToken}`
    }
  });
};

export const getLastKnownId = async (userId: string) => {
  const jwtToken = (await getJWTToken()) || "";
  const e = await fetch(`${apiUrl}/moodentry/last/${userId}`, {
    headers: {
      authorization: `Bearer ${jwtToken}`
    }
  });
  if (e.length) {
    return e[0].entryId;
  }
  return null;
};

export const authClient = async (userId: string) => {
  return fetch(`${apiUrl}/auth/client`, {
    method: "POST",
    body: {
      userId
    }
  });
};

export const addMoodEntry = async (moodEntry: MoodEntry) => {
  const jwtToken = (await getJWTToken()) || "";
  return fetch(`${apiUrl}/mood`, {
    method: "POST",
    body: {
      ...moodEntry
    },
    headers: {
      authorization: `Bearer ${jwtToken}`
    }
  });
};
