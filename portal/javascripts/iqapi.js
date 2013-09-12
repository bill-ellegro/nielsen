/*
******************************************************
******************************************************
@nswami 09/01/13
. . . . . 
This is the main API Hook to all IQ elements!
******************************************************
******************************************************

*/
var urlPrefix = "http://nportalellegro.apphb.com/nsHandlers/";
urlPrefix = "../../nsHandlers/";
//urlPrefix = "http://localhost:50112/nsHandlers/"

function IQ_AjaxCall(url, JSONCallback) {

	$.ajax({
		url: url, 
		dataType: "json"
	}).done(function(data) {
		//console.log(data);
		JSONCallback(data);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		// console.log(errorThrown);
	});

}

/******************************************************
Person API
******************************************************/
// Returns Person's Details about name, profile information etc. for a username!
function IQ_GetPersonDetails(username, JSONCallback){

	var url = urlPrefix + "nsPersonHandler.ashx?cmd=getpdetails&personid=" + username;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Person's IQ Meta tags for this user
function IQ_GetPersonIQProfile(username, JSONCallback){

	var url = urlPrefix + "nsPersonHandler.ashx?cmd=getpmetas&personid=" + username;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Person's 3rd Party Details: SKIP THIS 
function IQ_GetPerson3rdPartyDetails(username, JSONCallback){

}

// Upserts Person's Profile with Meta Array:
function IQ_SavePersonProfileWithMetaArrayStr(username, arraystr, JSONStrCallback){
	$.ajax({
	    url: urlPrefix + "nsPersonHandler.ashx?cmd=cleaninsertpmetaarray",
	    type: 'POST',
		data: "authkey=theluckymonk&personid="+username+"&metaarray="+arraystr
	}).done(function(data) {
		console.log(data);
		JSONStrCallback(data);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		// console.log(errorThrown);
		console.log(textStatus);
	});
}


/******************************************************
Content API
******************************************************/
// Returns Content basics
function IQ_GetContentBasics(contentid, JSONCallback){

	var url = urlPrefix + "nsContentHandler.ashx?cmd=getcmetas&contentid=" + contentid;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Content details
function IQ_GetContentDetails(contentid, JSONCallback){

	var url = urlPrefix + "nsContentHandler.ashx?cmd=getcmetas&contentid=" + contentid;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Content Analytics Plug
function IQ_GetContentExtendedDetails(contentid, personid, JSONCallback){

	var url = urlPrefix + "nsDetailsHandler.ashx?cmd=fetchcontentdetails&contentid="+contentid+"&personid="+personid;\

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}

// Returns Content 3rd Party Details
function IQ_GetContent3rdPartyDetails(contentid, JSONCallback){

}

// Returns Content for a stack API::findcontentformetatag
function IQ_GetContentForStack(stack, JSONCallback){

	var url = urlPrefix + "nsIQHandler.ashx?cmd=findcontentformetatag&metatag=" + stack;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Content for a tag-type
function IQ_GetContentForMetaType(metatype, JSONCallback){

	var url = urlPrefix + "nsIQHandler.ashx?cmd=findcontentformetatype&metatype=" + metatype;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Content for a specific tag API::findcontentformetatag
function IQ_GetContentForMetaTag(metatag, JSONCallback){

	var url = urlPrefix + "nsIQHandler.ashx?cmd=findcontentformetatag&metatag=" + metatag;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Content for a specific Tag & Type API::find
function IQ_GetContentForTagAndType(metatype, metatag, JSONCallback){

	var url = urlPrefix + "nsIQHandler.ashx?cmd=findcontentformetatypeandtag&metatype="+metatype+"&metatag=" + metatag;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}

// Returns Content for a specific tag and value: API::findcontentformetatag + only return matching values
function IQ_GetContentForMolecule(metatype, metatag, thresholdvalue, JSONCallback){
}

/******************************************************
Molecule IQ
******************************************************/

// Return tags for tagtypes.
function IQ_GetTags(type, JSONCallback){

	var url = urlPrefix + "nsContentHandler.ashx?cmd=gettagsfortype&type=" + type;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

/******************************************************
IQ Matching API
******************************************************/

// Returns Person's list of programs matched, regardless of status.
function IQ_GetAllProgramsForPerson(username, JSONCallback){

	var url = urlPrefix + "nsIQHandler.ashx?cmd=findcontentforpersonbytag&personid=" + username;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

// Returns Person's list of programs that are incomplete.
function IQ_GetOpenProgramsForPerson(username, JSONCallback){

	var url = urlPrefix + "nsIQHandler.ashx?cmd=findopencontentforpersonbytag&personid=" + username;

	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);

}

/*
Analytics API
*/
function IQ_GetPersonActivityLog(username, JSONCallback){

}

function IQ_AddActivity(activity, username, JSONCallback){

}

/*
Specific Calls
*/

function IQ_GetContentBasicsForUserAndVerb(username, verb, JSONCallback){
	var url = urlPrefix + "nsActivityLogHandler.ashx?cmd=getactivitydetailsforpersonandverb&personid=" + username + "&verb=" + verb;
	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}


function IQ_GetContentLogForUserAndVerb(username, verb, JSONCallback){
	var url = urlPrefix + "nsActivityLogHandler.ashx?cmd=getactivitylogforpersonandverb&personid=" + username + "&verb=" + verb;
	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}

function IQ_GetContentBasicsForUserAndVerbExceptVerb2(username, verb, excverb, JSONCallback){
	var url = urlPrefix + "nsActivityLogHandler.ashx?cmd=getactivitydetailsforpersonandexceptverb&personid=" + username + "&verb=" + verb + "&excverb=" + excverb;
	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}


function IQ_GetContentLogForUserAndVerbExceptVerb2(username, verb, excverb, JSONCallback){
	var url = urlPrefix + "nsActivityLogHandler.ashx?cmd=getactivitylogforpersonandexceptverb&personid=" + username + "&verb=" + verb + "&excverb=" + excverb;
	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}

/******************************************************
SESSION MANAGEMENT API
******************************************************/

function IQ_GetCurrentSessionUsername(JSONCallback){
	var url = urlPrefix + "nsSessionHandler.ashx";
	// make the query to the server
	IQ_AjaxCall(url, JSONCallback);
}