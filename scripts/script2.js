//Set the name space
var app = {};
app.search_key = '69e1fd1a14957b6a29617b7f530c597d:4:71390732';
app.ts_key = '649db9c496c858eedb328bff7b57331a:0:71390732';

//Get the TOP STORIES Info
app.getArticles = function(){
	$.ajax({
		url: 'http://api.nytimes.com/svc/topstories/v1/home.json?api-key=649db9c496c858eedb328bff7b57331a:0:71390732',
		dataType: 'json',
		type: 'GET',
        crossDomain: true,
		data: {
			format: 'json',
			key: app.ts_key
		},
		success: function(news){
			console.log('Success function called');
			console.log(news);
			app.displayArticles(news);
		} 
	});
}//END GETPIECES

app.displayArticles = function(news){
	//
	//LOOP THROUGH EACH ONE AND DISPLAY THEM
	for (var i = 0; i < articles.length; i++) {
		// console.log(i);
		// articles.splice(n,0);
		// var heighter = 200-(i*13);
		// var div = $('<div>').addClass('circle').css('height', heighter);
		// var headline = $('<p>').text(articles[i].title);
		// div.append(headline);
		// $('.wrapper').append(div);


		/////////////////////////////////////////////
		//D3.JS
		/////////////////////////////////////////////


	}
}

//Document ready
$(function() {
	app.getArticles();
	//
});





