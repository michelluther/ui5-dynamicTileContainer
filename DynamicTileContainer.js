jQuery.sap.declare("tts.DynamicTileContainer");

sap.m.TileContainer.extend("tts.DynamicTileContainer", {
	metadata: {
		properties: {
			tilePath:  { type: "string", group: "Behaviour", default: "huhu" },
			tileTemplate: { type: "sap.m.Tile", group: "Behaviour", default: null}
		}
	},



	rendered: false,

	renderer: {}
});

tts.DynamicTileContainer.prototype.onAfterRendering = function(){

	this.drawTiles();
	sap.m.TileContainer.prototype.onAfterRendering.apply(this);

	
};


tts.DynamicTileContainer.prototype.drawTiles = function(){
		
		var path = this.mProperties.tilePath;
		var pathArray = path.split(">");
		var pathModel;
		var pathContext;
		var coursePrograms = [];
		if (pathArray.length > 1){
			pathModel = pathArray[0];
			pathContext = pathArray[1];
			coursePrograms = this.oPropagatedProperties.oBindingContexts[pathModel].getObject()[pathContext];
		} 
		
		// TODO: Support for not-named Models
		
		if(this.rendered === false){
			this.removeAllTiles();
			var tile;
			for (var i = coursePrograms.length - 1; i >= 0; i--) {
				tile = new sap.m.StandardTile({
					title : coursePrograms[i].Title,
					icon : "sap-icon://complete",
					number : "0/" + coursePrograms[i].NumberOfElements 
				});
				// tile.getBindingContext().getObject();
				tile.addStyleClass("tts-medium-tile");
				this.addTile(tile);
			}
			this.rendered = true;
		}
	};

tts.DynamicTileContainer.prototype._updateTilePositions = function(){

	console.log("update mal die tilepositions");

	if (this.getTiles().length === 0) {	// no tiles
		return;
	}

	this._applyPageStartIndex(this._iCurrentTileStartIndex);
	this._applyDimension();

	var aTiles = this.getTiles(),
		oContentDimension = this._getContentDimension();

	this._iPages = Math.ceil(aTiles.length / this._iMaxTiles);

	for (var i=0; i < aTiles.length; i++) {

		if (aTiles[i].isDragged()) {
			continue;
		}

		var iPage =  Math.floor(i / this._iMaxTiles),
			oTile = aTiles[i],
			iLeft = (iPage * oContentDimension.outerwidth) + 60 + i % this._iMaxTilesX * this._oTileDimension.width,
			iTop =  this._iOffsetY + Math.floor(i / this._iMaxTilesX) * this._oTileDimension.height - (iPage * this._iMaxTilesY * this._oTileDimension.height);

		if (this._bRtl) {
			iLeft = (this._iPages - iPage) * oContentDimension.outerwidth - this._iOffsetX - (i % this._iMaxTilesX  + 1) * this._oTileDimension.width;
		}

		oTile.setPos(iLeft,iTop);
		oTile.setSize(this._oTileDimension.width, this._oTileDimension.height);
	}
}; 