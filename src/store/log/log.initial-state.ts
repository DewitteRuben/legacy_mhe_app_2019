import { LogState } from "./log.types";

const LOGS_INITIAL_STATE: LogState = {
  moodEntries: [],
  loading: false,
  error: null
};

export default LOGS_INITIAL_STATE;
