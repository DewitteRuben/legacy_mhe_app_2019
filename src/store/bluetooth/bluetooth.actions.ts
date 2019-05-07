import { ActionCreator } from "redux";
import {
	BluetoothActionTypes,
	SetConnectedDeviceAction,
} from "./bluetooth.types";

const setConnectedDevice: ActionCreator<SetConnectedDeviceAction> = (
	device: any
) => ({
	device,
	type: BluetoothActionTypes.SET_CONNECTED_DEVICE,
});

export { setConnectedDevice };
