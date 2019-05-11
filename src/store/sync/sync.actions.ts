import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { getLastKnownId } from "../../services/api";
import {} from "../../services/localStorage";
import { StoreState } from "../store.types";
import { SetLastKnownIdAction, SyncActionTypes } from "./sync.types";
// type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>;

const setLastKnownId: ActionCreator<SetLastKnownIdAction> = (id: string) => ({
  id,
  type: SyncActionTypes.ADD_LAST_KNOWN_ID
});

export { setLastKnownId };
