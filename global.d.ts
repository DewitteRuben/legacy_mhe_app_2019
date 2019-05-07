// Declare all packages without declaration file here to fix tslint/ts-jest
// https://github.com/Microsoft/TypeScript/issues/15031#issuecomment-407131785

// Add wildcard module name for json files to make them importable in TS
declare module "*.json" {
	const value: any;
	export default value;
}

declare var global: any;

declare module "react-native-vector-icons/FontAwesome";
declare module "react-navigation-tabs";
declare module "react-native-canvas";
declare module "react-native-calendars";