define([
	"jquery",
	"modules/NoteEdition/src/NoteEditionController",
	"modules/NoteEdition/src/NoteEditionView",
	"modules/NoteEdition/src/NoteSpaceManager",
	"modules/Edition/src/EditionModuleInterface"
], function($, NoteEditionController, NoteEditionView, NoteSpaceManager, EditionModuleInterface) {
	/**
	 * NoteEdition constructor
	 * @exports NoteEdition
	 */
	function NoteEdition(songModel, cursorModel, viewer, imgPath, snglNotesManager) {
		$.extend(this, new EditionModuleInterface());
		this.noteSpaceMng = snglNotesManager.getInstance(songModel, viewer);
		this.controller = new NoteEditionController(songModel, cursorModel, this.noteSpaceMng);
		this.view = new NoteEditionView(imgPath);
	}
	return NoteEdition;
});