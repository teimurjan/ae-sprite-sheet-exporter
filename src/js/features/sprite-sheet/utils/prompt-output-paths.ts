import { path } from "../../../lib/cep/node";
import { csi } from "../../../lib/utils/bolt";

type OutputPaths = {
	imagePath: string;
	jsonPath: string;
};

export const promptOutputPaths = (): OutputPaths => {
	const location = window.cep.fs.showSaveDialogEx(
		"Save Sprite Sheet Path",
		"",
		["png"],
	);
	if (!location.data) {
		throw new Error("No save location selected");
	}

	const imagePath = decodeURIComponent(location.data.replace("file://", ""));
	const jsonPath = imagePath.replace(/\.png$/, ".json");

	return { imagePath, jsonPath };
};
