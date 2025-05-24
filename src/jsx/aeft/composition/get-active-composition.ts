export const getActiveComposition = (): CompItem | null => {
	if (app.project.activeItem instanceof CompItem === false) {
		app.activeViewer?.setActive();
	}
	return app.project.activeItem as CompItem;
};
