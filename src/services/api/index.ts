import fetch from "../../utils/fetch";
const apiUrl = "http://localhost:3000/api";

export function getMoodEntriesByUserId(userId: string): any {
  return fetch(`${apiUrl}/mood/${userId}`);
}

export const getLastKnownId = async (userId: string) => {
  const e = await fetch(`${apiUrl}/mood/last/${userId}`);
  if (e.length) {
    return e[0].entryId;
  }
  return null;
};

export function addMoodEntry(
  entryId: string,
  userId: string,
  mood: string[],
  date: Date,
  note: string
): any {
  return fetch(`${apiUrl}/mood`, {
    method: "POST",
    body: {
      entryId,
      userId,
      mood,
      date,
      note
    }
  });
}
