jQuery.sap.declare("tts.DynamicTileContainer");

sap.m.TileContainer.extend("tts.DynamicTileContainer", {
	metadata: {
		properties: {
			tilePath:  { type: "string", group: "Behaviour", default: "huhu" },
			// tileTemplate:  { type: "sap.ui.core.Control", group: "Behaviour", default: {} },

		},

		aggregations: {"tileTemplate": { type: "sap.ui.core.Control", multiple : false, visibility: "public"}}
	},


	modelName : "",
	model : {},
	path : "",
	baseContextPath : "",
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
	var coursePrograms = [];
	var contexts = [];
	if (pathArray.length > 1){
		this.modelName = pathArray[0];
		this.pathContext = pathArray[1];
		contexts = this.oPropagatedProperties.oBindingContexts[this.modelName];
		coursePrograms = this.oPropagatedProperties.oBindingContexts[this.modelName].getObject()[this.pathContext];
		this.model = this.oPropagatedProperties.oBindingContexts[this.modelName].oModel;
		this.baseContextPath = this.oPropagatedProperties.oBindingContexts[this.modelName].sPath;
	} 
	
	// TODO: Support for not-named models
	
	if(this.rendered === false){
		this.removeAllTiles();
		var tile = this.mAggregations.tileTemplate;
		for (var i = 0; i < coursePrograms.length - 1; i++) {
			this._drawTile(tile, i);
		}
		this.rendered = true;
	}
};

tts.DynamicTileContainer.prototype._drawTile = function(tile, iterator){
	if (tile){
		var newTile = tile.clone();
		var path = this.baseContextPath + "/" + this.pathContext + "/" + iterator ;
		newTile.setModel(this.model);
		newTile.bindElement(path);
		this.addTile(newTile);
	}
};

tts.DynamicTileContainer.prototype._updateTilePositions = function(){

	console.log("ich update mal die tilepositions");

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