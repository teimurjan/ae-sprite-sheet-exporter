// biome-ignore lint/suspicious/noShadowRestrictedNames: JSON does not exist in jsx
declare const JSON: {
	stringify(object: object): string;
	parse(string: string): object;
};
