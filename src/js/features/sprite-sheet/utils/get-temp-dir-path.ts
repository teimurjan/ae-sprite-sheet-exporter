import { os, path } from "../../../lib/cep/node";

export const getTempDirPath = (): string => {
	return path.join(os.tmpdir(), `sprite-sheet-temp-${Date.now()}`);
};
