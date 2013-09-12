var displayPerPage = 5, 
	dataJSON;

var searchSubmission = function(q, url) {
	$.ajax({
		url: url, 
		dataType: "json", 
		data: {"q": q}
	}).done(function(data) {
		dataJSON = data;
		populateHeaderValues(q);
		buildResults(0);
		buildPagination();
		$('#results').reveal();
	}).fail(function(jqXHR, textStatus, errorThrown) {
		// console.log(errorThrown);
	});
}	/* /searchSubmission */


var populateHeaderValues = function(q) {
	$('#resultCount').html(dataJSON.metas.length);
	$('#resultsField').val(q);
}	/* /populateHeaderValues */


var buildResults = function(i) {
	$('#resultsContainer').empty();

	var arrayMetas = dataJSON.metas, 
		max = i + displayPerPage;

	if (max > arrayMetas.length) {
		max = arrayMetas.length;
	}

	for (; i < max; i++) {
		var objItem =		$(document.createElement('div')).attr('class', 'item cf'), 
			objIcon =		buildIcon('images/icon-card-title.png'), 
			objDetails =	buildDetails(arrayMetas[i].tag, arrayMetas[i].tagtype), 
			objStatus =		buildStatus('completed'), 
			objActions =	buildActions('');

		$(objItem)
			.append($(objIcon))
			.append($(objDetails))
			.append($(objStatus))
			.append($(objActions));

		$('#resultsContainer').append($(objItem));
	}
}	/* /buildResults */


var buildIcon = function(imgSrc) {
	var objIcon =	$(document.createElement('div')).attr('class', 'detail-icon'), 
		objP =		$(document.createElement('p')), 
		objImg =	$(document.createElement('img')).attr({
						'src': imgSrc, 
						'alt': ''
					});

	$(objP).append($(objImg));
	$(objIcon).append($(objP));

	return $(objIcon);
}	/* /buildIcon */


var buildDetails = function(title, description) {
	var objDetails =		$(document.createElement('div')).attr('class', 'details'), 
		objTitle =			$(document.createElement('h3')).html(title), 
		objDescription =	$(document.createElement('p')).html(description);

	$(objDetails)
		.append($(objTitle))
		.append($(objDescription));

	return $(objDetails);
}	/* /buildDetails */


var buildStatus = function(status) {
	var imgSrc;

	switch (status) {
		case 'completed':
			imgSrc = 'images/icon-completed.png';
			break;
	}

	var objStatus =	$(document.createElement('div')).attr('class', 'status'), 
		objP =		$(document.createElement('p')), 
		objImg =	$(document.createElement('img')).attr({
						'src': imgSrc, 
						'alt': ''
					});

	$(objP).append($(objImg));
	$(objStatus).append($(objP));

	return $(objStatus);
}	/* /buildStatus */


var buildActions = function(contentid) {
	var objActions =		$(document.createElement('div')).attr('class', 'actions'), 
		objDiscussion =		$(document.createElement('div')).attr('class', 'icon-link discussion-widget'), 
		objDiscussionLink =	$(document.createElement('a')).attr('href', '#' + contentid).html('Et et ipis'), 
		objRating =			$(document.createElement('div')).attr('class', 'icon-link rating-widget'), 
		objRatingLink =		$(document.createElement('a')).attr('href', '#' + contentid).html('Nos ovit a');

	$(objDiscussion).append($(objDiscussionLink));
	$(objRating).append($(objRatingLink));
	$(objActions)
		.append($(objDiscussion))
		.append($(objRating));

	return $(objActions);
}	/* /buildActions */


var buildPagination = function() {
	var numPages =	Math.floor(dataJSON.metas.length / displayPerPage), 
		objPrev =	$(document.createElement('a')).attr({
						'class': 'arrow prev inactive', 
						'href': '#prev'
					}), 
		objNext =	$(document.createElement('a')).attr({
						'class': 'arrow next', 
						'href': '#next'
					}), 
		objUL =		$(document.createElement('ul'));

	if (dataJSON.metas.length % displayPerPage > 0) {
		numPages += 1;
	}

	for (var i = 0; i < numPages; i++) {
		var objLI = $(document.createElement('li')), 
			objA =	$(document.createElement('a')).attr('href', '#' + (i + 1)).attr('class', function() {
						if (i === 0) {
							return 'paginate active';
						} else {
							return 'paginate';
						}
					}).html(i + 1);

		$(objLI).append($(objA));
		$(objUL).append($(objLI));
	}

	$('.container-results-footer')
		.empty()
		.append($(objPrev))
		.append($(objUL))
		.append($(objNext));

	$('.container-results-footer a.paginate, .container-results-footer a.arrow').click(function(e) {
		e.preventDefault();
		if (!$(this).hasClass('inactive')) {
			paginate($(this));
		}
	});
}	/* /buildPagination */


var paginate = function($objA) {
	var pageLinks = $('.container-results-footer a.paginate');

	/* clicked next/prev */
	if ($objA.hasClass('prev') || $objA.hasClass('next')) {
		$(pageLinks).each(function(i, element) {
			if ($(element).hasClass('active')) {
				if ($objA.hasClass('prev')) {
					$objA = $(pageLinks[i - 1]);
				} if ($objA.hasClass('next')) {
					$objA = $(pageLinks[i + 1]);
				}
			}
		});
	}

	/* change active page number */
	$(pageLinks).removeClass('active');
	$objA.addClass('active');

	var activePage = $('.container-results-footer a.paginate.active').html(), 
		startIndex = (activePage - 1) * displayPerPage;

	buildResults(startIndex, dataJSON);

	/* toggle next/prev states, if necessary */
	$(pageLinks).each(function(i, element) {
		if ($(element).attr('href') === $objA.attr('href')) {
			var objPrev = $('.container-results-footer a.arrow.prev'), 
				objNext = $('.container-results-footer a.arrow.next');

			if (i + 1 === $(pageLinks).length) {
				if (!$(objNext).hasClass('inactive')) {
					$(objNext).addClass('inactive');
				}
			} else {
				$(objNext).removeClass('inactive');
			}

			if (i === 0) {
				if (!$(objPrev).hasClass('inactive')) {
					$(objPrev).addClass('inactive');
				}
			} else {
				$(objPrev).removeClass('inactive');
			}
		}
	});
}	/* /paginate */


$(document).ready(function () {
	$('#searchForm').submit(function(e) {
		e.preventDefault();
		var q = $('#q').val(), 
			url = $(this).attr('action');

		searchSubmission(q, url);
	});

	$('#searchResultsForm').submit(function(e) {
		e.preventDefault();
		var q = $('#resultsField').val(), 
			url = $(this).attr('action');

		searchSubmission(q, url);
	});
});