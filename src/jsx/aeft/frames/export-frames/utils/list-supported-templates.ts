import { strategies } from "./get-strategy";

export const listSupportedTemplates = () => {
	const templates: string[] = [];
	for (const template of strategies) {
		templates.push(template.template);
	}
	return templates;
};
