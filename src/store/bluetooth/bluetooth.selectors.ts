import { StoreState } from "../store.types";

const getConnectedDevice = (state: StoreState) => state.bluetooth.device;

export { getConnectedDevice };
