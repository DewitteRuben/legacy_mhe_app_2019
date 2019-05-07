import { Store } from "redux";
import { BluetoothState } from "./bluetooth";
import { HeartState } from "./heart";
import { LogState } from "./log";

export interface StoreState extends Store {
  log: LogState;
  bluetooth: BluetoothState;
  heart: HeartState;
}
