import BLUETOOTH_INITIAL_STATE from "./bluetooth.initial-state";

import {
	BluetoothActionTypes,
	BluetoothState,
	SetConnectedDeviceAction,
} from "./bluetooth.types";

const languageReducer = (
	state: BluetoothState = BLUETOOTH_INITIAL_STATE,
	action: SetConnectedDeviceAction
) => {
	switch (action.type) {
		case BluetoothActionTypes.SET_CONNECTED_DEVICE: {
			return {
				...state,
				device: action.device,
			};
		}

		default:
			return state;
	}
};

export default languageReducer;
