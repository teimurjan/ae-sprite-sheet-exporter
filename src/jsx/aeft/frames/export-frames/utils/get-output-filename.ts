import type { ExportFramesStrategy } from "../../../../../shared/frames";

export const getOutputFilename = (
	comp: CompItem,
	strategy: ExportFramesStrategy,
) => `${comp.name}_[#####].${strategy.format}`;
