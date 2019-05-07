import fetch from "../../utils/fetch";
const apiUrl = "http://localhost:3000/api";

export function getMoodEntriesByUserId(userId: string): any {
  return fetch(`${apiUrl}/mood/${userId}`);
}

export function addMoodEntry(
  userId: string,
  mood: string[],
  date: Date,
  note: string
): any {
  return fetch(`${apiUrl}/mood`, {
    method: "POST",
    body: {
      userId,
      mood,
      date,
      note
    }
  });
}
