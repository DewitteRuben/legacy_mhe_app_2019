import { Store } from "redux";
import { BluetoothState } from "./bluetooth";
import { HeartState } from "./heart";
import { LogState } from "./log";
import { SyncState } from './sync';

export interface StoreState extends Store {
  log: LogState;
  bluetooth: BluetoothState;
  heart: HeartState;
  sync: SyncState;
}
