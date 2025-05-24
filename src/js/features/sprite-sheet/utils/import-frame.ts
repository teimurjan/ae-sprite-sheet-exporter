import { loadImage } from "canvas";
import type { CanvasRenderingContext2D } from "canvas";
import * as UTIF from "utif";
import type { ExportFramesFormat } from "../../../../shared/frames";
import { fs } from "../../../lib/cep/node";

type ImportedFrame = {
	width: number;
	height: number;
	attachToCanvas: (
		context: CanvasRenderingContext2D,
		x: number,
		y: number,
	) => void;
};

const importTiffFrame = (framePath: string): ImportedFrame => {
	const buffer = fs.readFileSync(framePath);
	const ifds = UTIF.decode(buffer);
	UTIF.decodeImage(buffer, ifds[0]);

	const rgba = UTIF.toRGBA8(ifds[0]);
	const width = ifds[0].width;
	const height = ifds[0].height;

	const imageData = new ImageData(new Uint8ClampedArray(rgba), width, height);

	return {
		width,
		height,
		attachToCanvas: (
			context: CanvasRenderingContext2D,
			x: number,
			y: number,
		) => {
			context.putImageData(imageData, x, y);
		},
	};
};

const importPngFrame = async (framePath: string): Promise<ImportedFrame> => {
	const buffer = fs.readFileSync(framePath);
	const dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
	const image = await loadImage(dataUrl);

	return {
		width: image.width,
		height: image.height,
		attachToCanvas: (
			context: CanvasRenderingContext2D,
			x: number,
			y: number,
		) => {
			context.drawImage(image, x, y);
		},
	};
};

export const importFrame = async (
	framePath: string,
	format: ExportFramesFormat,
): Promise<ImportedFrame> => {
	if (format === "tif") {
		return importTiffFrame(framePath);
	}
	if (format === "png") {
		return await importPngFrame(framePath);
	}

	throw new Error(`Unsupported image format: ${format}`);
};
