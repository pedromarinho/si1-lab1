var themes = [];
var numId = 1;

$(document).on('keydown', function(event) {
	if(event.keyCode === 13) {
		if(validForm('usr')){
			var varForm = document.getElementById('usr').value;
			if($.inArray(varForm, themes) === -1){
				var el = "<li id='li"+numId+"' class='list-group-item'>"+varForm+"<button id='moveButton' class='btn btn-lg btn-primary btn-block' title='Mover para temas aprendidos' onclick='move(li"+numId+")'>Mover</button><button id='removeButton' class='btn btn-lg btn-primary btn-block' onclick='removeElement(li"+numId+")' title='Excluir tema'>Excluir</button></li>";
				$( "#list1" ).append(el);
				themes.push(varForm);
				numId++;
				searchVideos();
			}else{
				//alert('O tema já foi inserido');
				showErrorMessage('O tema já foi inserido');
				document.getElementById('usr').focus();
			}
		}
	}
});
							
function validForm(id){
	if(document.getElementById(id).value.length === 0){
		showErrorMessage('Digite um tema');
		document.getElementById(id).focus();
		return false
	}return true
}

function removeElement(id){
	var str = $( id ).text();
	var res = str.replace("MoverExcluir", ""); 
	arrayRemoveElement(res, themes);
	$( id ).remove();
}

function move(id){
	var str = $( id ).text();
	var res = str.replace("MoverExcluir", ""); 
	$( "#list2" ).append('<li class="list-group-item">'+res+'</li>');
	$( id ).remove();
}

function showErrorMessage(msg){
	$(document).ready(function () {
		window.setTimeout(function() {
			$("#form").append('<div id="alert"></div>');
			$("#alert").html('<div style="max-width:500px;" class="alert alert-danger">'+msg+'</div>');
		    $("#alert").fadeTo(2000, 0).slideUp(0, function(){
		        $(this).remove(); 
		    });
		}, 50);
	});
}

function arrayRemoveElement(element, array){
	index = array.indexOf(element);
	array.splice(index, 1);
}

function searchVideos() {
	var varForm = document.getElementById('usr').value;
	var script = document.createElement('script');
	script.setAttribute('id', 'jsonScript');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
					                   'videos?vq='+varForm+'&max-results=4&' + 
					                   'alt=json-in-script&callback=showVideos&' + 
					                   'orderby=relevance');
	document.documentElement.firstChild.appendChild(script);
}

function showVideos(data){
	var varForm = document.getElementById('usr').value;
	var feed = data.feed;
	var entries = feed.entry || [];
	var html = ['<h3>Vídeos relacionados a "'+varForm+'"</h3><ul>'];
	for (var i = 1; i < entries.length; i++){
		var entry = entries[i];
		var playCount = entry.yt$statistics.viewCount.valueOf() + ' views';
		var title = entry.title.$t;
		var lnk = '<a href = \"' + entry.link[0].href + '\">'+entry.link[0].href+'</a>';
		html.push('<li>', title, ': ', lnk, '</li>');
	}
	html.push('</ul>');
	document.getElementById("youtubeResult").innerHTML = html.join('');
}
