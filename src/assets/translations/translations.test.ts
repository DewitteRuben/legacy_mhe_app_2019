import difference from "lodash.difference";
import get from "lodash.get";

import translations from "./translations";

describe("Translation files", () => {
	it("Should not have any missing keys in translation resource files", () => {
		const allLanguages = Object.keys(translations);

		// Find all available keys
		const allKeys = allLanguages
			.reduce(
				(acc: string[], lang: string) => [
					...acc,
					...Object.keys(get(translations, lang)),
				],
				[]
			)
			.filter((key, i, all) => all.indexOf(key) === i);

		// Map to `[lang]: key[]` format
		const keyMap = Object.keys(translations).reduce(
			(acc, lang) => ({
				...acc,
				[lang]: Object.keys(get(translations, lang)),
			}),
			{}
		);

		// Find diff for each language
		const missingKeys = Object.keys(keyMap).reduce(
			(acc, lang) => ({
				...acc,
				[lang]: difference(allKeys, get(keyMap, lang)),
			}),
			{}
		);

		// report on missing keys and fail test if any are missing
		let hasMissingKeys = false;
		Object.entries(missingKeys).forEach(([language, keys]) => {
			if ((keys as []).length) {
				hasMissingKeys = true;
				// tslint:disable-next-line no-console
				console.error(`Missing key(s): "[${keys}]" in language: ${language}`);
			}
		});

		expect(hasMissingKeys).toEqual(false);
	});
});
