//Set the name space
var app = {};

//SETS IF IT'S A TOP STORIES OR SEARCH CALL
app.display_ts = true;

//TOP STORIES VARIABLES
app.ts_vars = {
	key : '649db9c496c858eedb328bff7b57331a:0:71390732',
	url : 'http://api.nytimes.com/svc/topstories/v1/home.json',
	data_type : 'json',
	call_back : '',
	query : ''
}

//SEARCH VARIABLES
app.search_vars ={
	key : '07193a389d1c16a39c8e017124b287c9:6:71390732',
	url : 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp',
	data_type : 'jsonp',
	call_back : 'svc_search_v2_articlesearch',
	query : ''
}

app.api_holder = app.ts_vars;
//AJAX VARIBLES

/////////////////////////////////////////////////////////////
/////////////////TOP STORIES AJAX CALL////////////////////////////
/////////////////////////////////////////////////////////////
app.getArticles = function(){
	$.ajax({
		url: app.api_holder.url,
		dataType: app.api_holder.data_type,
		type: 'GET',
		jsonpCallback: app.api_holder.call_back,
		data: {
			format: app.api_holder.data_type,
			'api-key': app.api_holder.key,
			q: app.api_holder.query
		},
		success: function(news){
			app.displayArticles(news);
		} 
	});
}
//END GETARTICLES

//SET THE SECTION ICONS TO BE CALLED
app.iconArray = {
	'World' : 'fa fa-globe',
	'U.S.' : 'fa fa-flag',
	'Business Day' : 'fa fa-briefcase',
	'Sports' : 'fa fa-futbol-o',
	'Arts' : 'fa fa-paint-brush',
	'Technology' : 'fa fa-desktop',
	'null' : 'fa fa-skyatlas',
	'N.Y. / Region' : 'fa fa-building-o',
	'Books' : 'fa fa-book',
	'Magazine' : 'fa fa-newspaper-o',
	'Movies' : 'fa fa-film',
	'Dining & Wine' : 'fa fa-glass',
	'Opinion' : 'fa fa-comment',
	'Theater' : 'fa fa-users',
	'Multimedia' : 'fa fa-video-camera',
	'Travel' : 'fa fa-plane',
	'Job Market' : 'fa fa-calendar-o',
	'Real Estate' : 'fa fa-home',
	'Style' : 'fa fa-shirtsinbulk',
	'Great Homes & Destinations' : 'fa fa-plane',
	'Paid Death Notices' : 'fa fa-minus-square',
	'Multimedia/Photos' : 'fa fa-camera',
	'NYT Now' : 'fa fa-calendar'
}
//SET THE BACKGROUND HOVER
app.listBg = {
	'World' : 'listBg01',
	'U.S.' : 'listBg02',
	'Business Day' : 'listBg03',
	'Sports' : 'listBg04',
	'Arts' : 'listBg05',
	'Technology' : 'listBg06',
	'null' : 'listBg07',
	'N.Y. / Region' : 'listBg08',
	'Books' : 'listBg09',
	'Magazine' : 'listBg10',
	'Movies' : 'listBg11',
	'Dining & Wine' : 'listBg12',
	'Opinion' : 'listBg13',
	'Theater' : 'listBg14',
	'Multimedia' : 'listBg15',
	'Travel' : 'listBg16',
	'Job Market' : 'listBg17',
	'Real Estate' : 'listBg18',
	'Style' : 'listBg19',
	'Great Homes & Destinations' : 'listBg20',
	'Paid Death Notices' : 'listBg21',
	'Multimedia/Photos' : 'listBg22',
	'NYT Now' : 'listBg23'
}

app.putAbove = 100;//VARIABLE FOR THE Z-INDEX
var getArticleId;//THIS IS THE VARIALBLE THAT HOLDS THE CLICKED ID
var putArticle;//THIS IS THE VARIABLE TO IDENTIFY THE LINK DRAGGED

app.displayArticles = function(news){
	//
	$('.article-wrapper').html('');
	if (app.display_ts == true){
			var articles = news.results;//TOP STORIES CONTAINER

			// LOOP THROUGH EACH ONE AND DISPLAY THEM
			for (var i = 0; i < articles.length; i++) {
				var div = $('<div>').attr('id', 'list'+[i]).addClass('list').addClass(app.listBg[articles[i].section]).draggable({ revert: true });
				var headline = $('<p>').attr('class', 'artTitle').text(articles[i].title);
				div.append(headline);

				var divIcon = $('<div>').attr('class', 'listIcon');//
				var symbol = $('<i>').attr('class', app.iconArray[articles[i].section]);
				divIcon.append(symbol);
				div.append(divIcon);
				
				$('.article-wrapper').append(div);
				//STORE SPECIFIC ARTICLES
				 $('#list'+[i]).data(articles[i]);
				}
		} else {
			var articles = news.response.docs;//SEARCH CONTAINER
			// LOOP THROUGH EACH ONE AND DISPL{AY THEM
			for (var i = 0; i < articles.length; i++) {
				var div = $('<div>').attr('id', 'list'+[i]).addClass('list').addClass(app.listBg[articles[i].section_name]).draggable({ revert: true });
				var headline = $('<p>').attr('class', 'artTitle').text(articles[i].headline.main);
				div.append(headline);

				var divIcon = $('<div>').attr('class', 'listIcon');//
				var symbol = $('<i>').attr('class', app.iconArray[articles[i].section_name]);
				divIcon.append(symbol);
				div.append(divIcon);

				$('.article-wrapper').append(div);
				//STORE SPECIFIC ARTICLES
				 $('#list'+[i]).data(articles[i]);
				}
		}
//////THIS HERE BECAUSE WE HAVE TO WAIT UNTIL THE LIST ITEMS ARE CREATED//
	//CHANGE SIZE ONCE THE PICKED UP
	$('.list').on('mousedown', function(){
		getArticleId = $(this).attr('id');//GET ID
		putArticle = $('#' + getArticleId).data();//PUT ID
		app.putAbove++;//THIS SETS THE Z-INDEX PUTTER UP ONE
		$(this).addClass("moving").css('z-index', app.putAbove);
	});
	//REVERT SIZE ONCE IF DROPPED OUTSIDE THE DROPZONE
	$('.list').on('mouseup', function(){
		$(this).removeClass("moving");

	});
}//DISPLAY ARTICLES ENDS

//DISPLAY THE READER, HIDE THE DROP ZONE
app.showReader = function(){
	$('.drop-article').toggleClass('drop-article__switcher');
	$('.zone').toggleClass('zone__switcher');
	//RUN THE CONTENT LOAD
	app.loadContent();
}
//DISPLAY THE READER
app.hideReader = function(){
	$('.close').on('click', function(){
		console.log('hide the article')		
		$('.drop-article').toggleClass('drop-article__switcher');
		$('.zone').toggleClass('zone__switcher');
		app.clearContent();
	});
}
//DISPLAY THE READER
app.searchReveal = function(){
	$('.searchControl').on('click', function(){
		if (app.display_ts == true){
			app.display_ts = false;//THIS SETS THE DISPLAY RESULTS TO SEARCH PARAMETER
			app.api_holder = app.search_vars;
			console.log(app.api_holder.url);
		} else {
			app.display_ts = true;
			app.api_holder = app.ts_vars;
			console.log(app.api_holder.url);
			app.getArticles();
		}
		$('.search-form').toggleClass('switchOn');
		$('.heading').toggleClass('switchOff');
		$(this).toggleClass('on');
	});
}

//THIS IS THE VARIABLES & CLASSES FOR THE HOOKING UP THE DATA
app.loadContent = function(){
	if (app.display_ts == true){
		$('span.category').text(putArticle.section);
		$('span.hl').text(putArticle.title);
		if(putArticle.byline){
			$('span.bl').text(putArticle.byline);
		}
		//
		if(putArticle.multimedia[3]){
			$('.picture').attr('src', putArticle.multimedia[3].url);
		}else{
			$('.picture').attr('src', 'images/ph_img.jpg');
		}
		$('span.description').text(putArticle.abstract);
		// $('span.date').text(putArticle.created_date);
		$('.artLink').attr('href', putArticle.url);
	} else {
		$('span.category').text(putArticle.section_name);
		$('span.hl').text(putArticle.headline.main);
		if(putArticle.byline){
			$('span.bl').text(putArticle.byline.original);
		}
		if(putArticle.multimedia[1]){
			$('.picture').attr('src', 'http://static01.nyt.com/' + putArticle.multimedia[1].url);
		}else{
			$('.picture').attr('src', 'images/ph_img.jpg');
		}
		$('span.description').text(putArticle.snippet);
		// $('span.date').text(putArticle.pub_date);
		$('.artLink').attr('href', putArticle.web_url);
	}
}
app.clearContent = function(){
	$('span.category').text('');
	$('span.hl').text('');
	$('span.bl').text('');
	$('.picture').attr('src', '');
	$('.picture').attr('title', '');
	$('span.description').text('');
	$('span.date').text('');
	$('.artLink').attr('href', '');
}

//INIT
app.init = function(){
	//SET THE DROPPABLE AREA FOR THE ARTICLES
	$('.zone').droppable({
		hoverClass: "zone__hilight",
		    drop: function(event, ui) {
	        ui.draggable.remove();
	        //SHOW THE ARTICLE
	        app.showReader();	
        }
	});
	//HIDE THE ARTICLE 
	app.hideReader();
	//REVEAL THE SEARCH FIELD
	app.searchReveal();
	//RUN THE SEARCH FUNCTIONALITY
	$('.search-form').on('submit', function(e){
		//RUN THIS CODE
		e.preventDefault();
		//GRAB THE VALUE OF THE INPUT AND STORE IT
		app.api_holder.query = $('.q').val();
		console.log('search for ' + app.api_holder.query);
		app.getArticles();
	});
}

//Document ready
$(function() {
	app.getArticles();
	app.init();
});