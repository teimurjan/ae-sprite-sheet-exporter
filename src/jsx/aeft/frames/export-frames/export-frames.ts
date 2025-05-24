import type { ExportFramesResult } from "../../../../shared/frames";
import { getActiveComposition } from "../../composition/get-active-composition";
import { getCompositionInfo } from "../../composition/get-composition-info";
import {
	clearRenderQueue,
	getErrorText,
	getOutputFilename,
	getStrategy,
	listSupportedTemplates,
} from "./utils";

export const exportFrames = (outputPath: string): ExportFramesResult => {
	const comp = getActiveComposition();
	const info = getCompositionInfo();
	if (!comp || !info) {
		return { success: false };
	}

	try {
		clearRenderQueue();

		comp.workAreaStart = 0;
		comp.workAreaDuration = comp.duration;

		const rqItem = app.project.renderQueue.items.add(comp);
		const om = rqItem.outputModule(1);

		const strategy = getStrategy(om);
		if (!strategy) {
			throw new Error(
				`Composition has no supported templates: ${listSupportedTemplates().join(
					", ",
				)}`,
			);
		}

		om.applyTemplate(strategy.template);

		const outputFile = new File(
			`${outputPath}/${getOutputFilename(comp, strategy)}`,
		);
		om.file = outputFile;

		app.project.renderQueue.render();

		return { success: true, format: strategy.format };
	} catch (e) {
		clearRenderQueue();
		alert(getErrorText(e));
		return { success: false };
	}
};
