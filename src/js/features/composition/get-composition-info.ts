import { evalTS } from "../../lib/utils/bolt";

export const getCompositionInfo = async () => {
	return await evalTS("getCompositionInfo");
};
