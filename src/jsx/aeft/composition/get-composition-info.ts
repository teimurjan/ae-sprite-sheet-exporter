import type { CompositionInfo } from "../../../shared/composition";
import { getActiveComposition } from "./get-active-composition";

export const getCompositionInfo = (): CompositionInfo | null => {
	const comp = getActiveComposition();
	if (!comp) {
		return null;
	}

	return {
		name: comp.name,
		width: comp.width,
		height: comp.height,
		frameRate: comp.frameRate,
		duration: comp.duration,
		totalFrames: Math.floor(comp.duration * comp.frameRate),
	};
};
