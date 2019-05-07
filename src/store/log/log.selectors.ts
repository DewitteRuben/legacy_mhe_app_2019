import get from "lodash.get";

import { StoreState } from "../store.types";

const getMoodEntries = (state: StoreState) => state.log.moodEntries;
const getStatus = (state: StoreState) => state.log.loading;

export { getMoodEntries, getStatus };
