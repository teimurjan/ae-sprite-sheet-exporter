import type { ExportFramesStrategy } from "../../../../../shared/frames";

export const strategies: ExportFramesStrategy[] = [
	{ template: "PNG Sequence", format: "png" },
	{ template: "TIFF Sequence with Alpha", format: "tif" },
];

export const getStrategy = (om: OutputModule): ExportFramesStrategy | null => {
	for (const strategy of strategies) {
		for (const template of om.templates) {
			if (template === strategy.template) {
				return strategy;
			}
		}
	}

	return null;
};
