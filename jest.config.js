module.exports = {
	preset: "react-native",
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js"
	],
	transform: {
		"^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
		"^.+\\.(js)$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
		"\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
	},
	transformIgnorePatterns: [
		"node_modules/(?!react-router-native)/"
	],
	testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
	testPathIgnorePatterns: [
		"\\.snap$",
		"<rootDir>/node_modules/"
	],
	cacheDirectory: ".jest/cache"
}
