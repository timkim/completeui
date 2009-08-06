//
// BOUND
//
/**
 * Makes a request to the server with no start or pagesize parameters.
 * @param {object} context
 * @param {function} callback
 * @param {function} errorCallback
 * @public
 */
nitobi.data.DataTable.prototype.getTable = function(context, callback, errorCallback)
{
	this.errorCallback = errorCallback;

	var ajaxCallback = this.ajaxCallbackPool.reserve();

	ntbAssert(Boolean(ajaxCallback),"The datasource is serving too many connections. Please try again later. # current connections: " + this.ajaxCallbackPool.inUse.length );

	// This is an editor's gethandler
	var getHandler = this.getGetHandler().split('?')[0];
	var data = this.getGetHandler().split('?')[1];
	ajaxCallback.handler = getHandler;
	// This is a hack
	ajaxCallback.responseType = "";
	ajaxCallback.context = this;
	ajaxCallback.completeCallback = nitobi.lang.close(this,this.getComplete);
//	ajaxCallback.onGetComplete.subscribeOnce(this.getComplete, this);
	// TODO: Is this right, 4th null. What is the pagesize here?
	ajaxCallback.async = this.async;
	// StartXi is supposed to 0 in a getTable request ... when are these even used?
	ajaxCallback.params = new nitobi.data.GetCompleteEventArgs(null, null, 0, null,ajaxCallback, this, context, callback);

	if (typeof(callback) != 'function' || this.async == false)
	{
		ajaxCallback.async = false;
		return this.getComplete({"response":ajaxCallback.post(), "params":ajaxCallback.params});
	}
	else
	{
		ajaxCallback.post(data);
	}
}



/**
 * Gets data from the server-side data via Eba.Calback.
 */
nitobi.data.DataTable.prototype.getFromServer = function(firstRow, lastRow, low, high, context, callback, errorCallback)
{
	ntbAssert(this.getHandler!=null&&typeof(this.getHandler)!="undefined","getHandler not defined in table eba.datasource",EBA_THROW);

	this.requestCache.insert(low,high);

	var pageSize = (lastRow == null ? null : (high - low + 1));
	var strPageSize = (pageSize == null ? "" : pageSize);
	var getHandler = this.getGetHandler().split('?')[0];

	var postParams = this.buildParams(low, strPageSize, (this.sortColumn || ""), this.sortDir);

	var ajaxCallback = this.ajaxCallbackPool.reserve();
	
	ntbAssert(Boolean(ajaxCallback),"The datasource is serving too many connections. Please try again later. # current connections: " + this.ajaxCallbackPool.inUse.length );
	ajaxCallback.handler = getHandler;
	// This is a hack!
	ajaxCallback.responseType = "www-form-urlencoded";
	ajaxCallback.context = this;
	ajaxCallback.completeCallback = nitobi.lang.close(this,this.getComplete);
	//ajaxCallback.onGetComplete.subscribeOnce(this.getComplete, this);
	ajaxCallback.async = this.async;
	ajaxCallback.params = new nitobi.data.GetCompleteEventArgs(firstRow, lastRow, low, pageSize, ajaxCallback, this, context, callback);

	return ajaxCallback.post(postParams);
}

/*
nitobi.data.DataTable.prototype.buildParams = function(low, pageSize, sortColumn, sortDirection)
{
	var getHandlerStr = this.getGetHandler().split('?');
	var getHandler = getHandlerStr[0];
	var paramList = getHandlerStr[1].split('&');
	var params = "<params>";
	for (var i = 0; i < paramList.length; ++i)
	{
		var pair = paramList[i].split("=");
		params += "<" + pair[0] + ">" + pair[1] + "</" + pair[0] + ">";
	}
	params += "<PageSize>" + pageSize + "</PageSize>";
	params += "<SortColumn>" + sortColumn + "</SortColumn>";
	params += "<SortDirection>" + sortDirection + "</SortDirection>";
	params += "<StartRecordIndex>" + low + "</StartRecordIndex>";
	params += "<start>" + low + "</start>";
	params += "</params>";
	return params;
}

*/
nitobi.data.DataTable.prototype.buildParams = function(low, pageSize, sortColumn, sortDirection)
{
	var getHandlerStr = this.getGetHandler().split('?');
	var getHandler = getHandlerStr[0];
	var params = getHandlerStr[1];
	params += "&PageSize=" + pageSize + "&";
	params += "SortColumn=" + sortColumn + "&";
	params += "SortDirection=" + sortDirection + "&";
	params += "StartRecordIndex=" + low + "&";
	params += "start=" + low; 
	return params;
}

