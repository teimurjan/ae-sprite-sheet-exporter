export const clearRenderQueue = () => {
	while (app.project.renderQueue.numItems > 0) {
		app.project.renderQueue.item(1).remove();
	}
};
