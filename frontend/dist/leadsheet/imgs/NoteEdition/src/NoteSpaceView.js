define(['modules/Edition/src/ElementView'], function(ElementView) {
	/**
	 * NoteSpaceView allow note to be selected
	 * This object is created by NoteSpaceManager
	 * @param {Object} position {x:439.25, y:33,w:10,h:10} //position
	 * @param {Scaler} viewerScaler   Scaler object
	 * @exports NoteEdition/NoteSpaceView
	 */
	function NoteSpaceView(position, viewerScaler) {
		this.position = position;
		this.scaler = viewerScaler;
	}
	/**
	 * @interface
	 * @param  {Object}  coords [description]
	 * @return {Boolean}        [description]
	 */
	NoteSpaceView.prototype.isInPath = function(coords) {
		return ElementView.isInPath(coords, this.position, this.scaler);
	};
	/**
	 * @interface
	 * @param  {Object}  coords [description]
	 * @return {Boolean}        [description]
	 */
	NoteSpaceView.prototype.isBetweenYs = function(coords) {
		return ElementView.isBetweenYs(coords, this.position, this.scaler);
	};
	/**
	 * @interface
	 */
	NoteSpaceView.prototype.getArea = function() {
		return this.position;
	};

	return NoteSpaceView;
});