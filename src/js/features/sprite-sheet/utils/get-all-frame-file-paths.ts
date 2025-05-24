import type { ExportFramesFormat } from "../../../../shared/frames";
import { fs, path } from "../../../lib/cep/node";

const imageNameToNumber = (imageName: string): number =>
	Number.parseInt(imageName.match(/\d+/)?.[0] || "0");

const imageIndexSorter = (imageName1: string, imageName2: string): number =>
	imageNameToNumber(imageName1) - imageNameToNumber(imageName2);

export const getAllFrameFilePaths = (
	dir: string,
	format: ExportFramesFormat,
	totalFrames: number,
): Promise<string[]> => {
	const startTime = Date.now();
	return new Promise((resolve, reject) => {
		const checkFiles = () => {
			const maxWaitTime = totalFrames * 1000;
			if (Date.now() - startTime > maxWaitTime) {
				reject(new Error("Timeout waiting for all image files to be written"));
				return;
			}

			const files = fs
				.readdirSync(dir)
				.filter((file) => file.toLowerCase().endsWith(`.${format}`));
			if (files.length === totalFrames) {
				resolve(
					files.map((file) => path.join(dir, file)).sort(imageIndexSorter),
				);
			} else {
				setTimeout(checkFiles, 500);
			}
		};
		checkFiles();
	});
};
