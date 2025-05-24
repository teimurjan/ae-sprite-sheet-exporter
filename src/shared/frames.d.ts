export type ExportFramesFormat = "png" | "tif";

export type ExportFramesStrategy = {
	template: string;
	format: ExportFramesFormat;
};

export type ExportFramesResult =
	| { success: true; format: ExportFramesFormat }
	| { success: false };
