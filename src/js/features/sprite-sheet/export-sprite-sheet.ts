import { fs } from "../../lib/cep/node";
import { evalTS } from "../../lib/utils/bolt";
import { createSpriteSheet } from "./create-sprite-sheet";
import type { ExportSpriteSheetResult } from "./types";
import {
	getAllFrameFilePaths,
	getTempDirPath,
	promptOutputPaths,
} from "./utils";

export const exportSpriteSheet = async (): Promise<ExportSpriteSheetResult> => {
	const info = await evalTS("getCompositionInfo");
	if (!info) {
		throw new Error("No active composition found");
	}

	const tempDir = getTempDirPath();
	fs.mkdirSync(tempDir);

	try {
		const exportFramesResult = await evalTS("exportFrames", tempDir);
		if (!exportFramesResult.success) {
			throw new Error("Failed to export frames");
		}
		const frameFilePaths = await getAllFrameFilePaths(
			tempDir,
			exportFramesResult.format,
			info.totalFrames,
		);

		const outputPaths = promptOutputPaths();

		const createSpriteSheetResult = await createSpriteSheet(
			frameFilePaths,
			exportFramesResult.format,
			info.frameRate,
		);

		fs.writeFileSync(outputPaths.imagePath, createSpriteSheetResult.image);
		fs.writeFileSync(
			outputPaths.jsonPath,
			JSON.stringify(createSpriteSheetResult.metadata),
		);

		return outputPaths;
	} finally {
		if (fs.existsSync(tempDir)) {
			fs.rmSync(tempDir, { recursive: true, force: true });
		}
	}
};
