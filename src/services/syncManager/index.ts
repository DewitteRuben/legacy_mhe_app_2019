import store, { StoreState } from "../../store";
import {
  fetchAddMoodEntry,
  fetchMoodEntries,
  MoodEntry
} from "../../store/log";
import { getLastKnownId as getLastKnownOnlineId } from "../api";
import {
  getLastKnownMoodEntry as getLastKnownLocalId,
  getLocalMoodEntries,
  setLastKnownId as setLastKnownLocalId,
  getUserId
} from "../localStorage";
const SYNC_INTERVAL = 60000;

export default class ServiceManager {
  private timer?: any;

  public sync = async () => {
    try {
      const userId = (await getUserId()) || "";
      const onlineId = await getLastKnownOnlineId(userId);

      // receive local data
      const localMoodEntries = await getLocalMoodEntries();

      // if there are no online entries
      if (!onlineId) {
        // add all local entries to the online database
        localMoodEntries.forEach((e: MoodEntry) => {
          store.dispatch(fetchAddMoodEntry(e) as any);
        });
        return;
      }

      // index of the last online entry found in the local entries
      const indexLastOnlineInLocal = localMoodEntries
        .map((e: MoodEntry) => e.entryId)
        .indexOf(onlineId);

      // if the last online item is found locally
      if (indexLastOnlineInLocal > -1) {
        // get all new local changes that aren't found online
        const newLocalNotOnlineEntries = localMoodEntries.slice(
          indexLastOnlineInLocal + 1
        );

        // push all new local changes
        newLocalNotOnlineEntries.forEach((e: MoodEntry) => {
          store.dispatch(fetchAddMoodEntry(e) as any);
        });
      } else {
        store.dispatch(fetchMoodEntries() as any);
      }
    } catch (error) {
      console.log(error);
      // do nothing
    }
  };

  public start = () => {
    this.timer = setInterval(this.sync, SYNC_INTERVAL);
  };

  public stop = () => {
    clearInterval(this.timer);
  };
}
