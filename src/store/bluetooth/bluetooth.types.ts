import { Action } from "redux";

export enum BluetoothActionTypes {
	SET_CONNECTED_DEVICE = "@bluetooth/SET_CONNECTED_DEVICE",
}

export interface SetConnectedDeviceAction extends Action {
	device: any;
}

export interface BluetoothState {
	device: any;
}
