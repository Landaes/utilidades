String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /(?:^|[^\wà-öø-ÿ])[\wà-öø-ÿ]/g, function (m) {
        return m.toUpperCase();
    });
};

// se usa así:
// var myString = "hola soy un PULENTO script";
// myString.capitalize() devuelve: "Hola Soy Un Pulento Script"
// simplecito

String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		return "<span>"+t+"</span>";
	});
};

String.prototype.parseUsername = function() {
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		var username = u.replace("@","")
		return u.link("http://twitter.com/"+username);
	});
};

String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
		return url.link(url);
	});
};

////***ahora para hacer random de objetos y de arrays***////
Array.prototype.shuffle = function(){
    for (var i = 0; i < this.length; i++){
        var a = this[i];
        var b = Math.floor(Math.random() * this.length);
        this[i] = this[b];
        this[b] = a;
    }
};
var Randomize = {
    mezcla:function(obj){
        var new_obj = Randomize.shuffleProperties(obj);
        return new_obj;
    },
    shuffleProperties:function(obj) {
        var new_obj = {};
        var keys = Randomize.getKeys(obj);
        keys.shuffle();
        for (var key in keys){
            if (key === "shuffle") {continue;} // se salta el metodo del prototipo más arriba
            new_obj[keys[key]] = obj[keys[key]];
        }
        return new_obj;
    },
	getKeys: function (obj){
        var arr = new Array();
        for (var key in obj){
            arr.push(key);
        }
        return arr;
    },
    shuffleArray: function(array){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
};
// Se usa así:
// para un array:
// var array = ["a","b","c","d","e"];
// var randomArray = Randomize.shuffleArray(array);

// para un objeto:
// var obj = {a:data_a, b:data_b, c:data_c};
// var randomObj = Randomize.mezcla(obj);

//////***Utilidades varias que uso siempre***///////

// Las voy a poner dentro de la variable Front que uso siempre
// Todo funciona con JQuery y TweenMax

var Front = {
	utils = {
		isValidEmailAddress:function(emailAddress){
	        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	        return pattern.test(emailAddress);
	    }
	},
	yutub:{
        videoPlayer:null,
        arrVideos:["WPJJ4jJbitg","ZTidn2dBYbY"],//Acá se pone un array de videos
        animando:false, //para los thumbs (si es que hay)
        ponVideoYoutube:function(i, divVideo){
            var st = '<iframe id="yt" width="100%" height="100%" src="https://www.youtube.com/embed/'+Front.yutub.arrVideos[i]+'?rel=0&showinfo=0&wmode=opaque&modestbranding=1&enablejsapi=1&version=3&playerapiid=ytplayer&controls=0" frameborder="0" allowfullscreen></iframe>';
            divVideo.prepend(st);//prepend y así evito pitearme contenido que ya haya dentro
            Front.yutub.videoPlayer = new YT.Player("yt", {
                events: {
                    'onReady': Front.yutub.onPlayerReady,
                    'onStateChange': Front.yutub.onPlayerStateChange
                }
            });
        },
        onPlayerReady: function(e) {
            console.log("ready?");
            //e.target.playVideo();
        },
        onPlayerStateChange: function(e) {
            if (e.data === 0) {
                console.log("final");
            }
            else if (e.data === 1) {
                console.log("play");
            }
            else if (e.data === 2) {
                console.log("pausa");
            }
        },
        createThumbnailsVideo:function(divContainer){
            Front.yutub.animando = false;
            //divContainer = $("#thumbsVideos .mascara .thumbs"); por ejemplo
            
            for (var i = 0; i < Front.yutub.arrVideos.length; i++) {
                divContainer.append("<img src='http://img.youtube.com/vi/"+Front.yutub.arrVideos[i]+"/default.jpg' width='120px' id='thumb_y"+i+"' class='thumb' data='"+i+"'>");
                $("#thumb_y"+i).click(function(){
                    Front.yutub.ponVideoYoutube($(this).attr("data"));
                });
            }
            Front.yutub.updateAnchoCarrusel(divContainer);
        },
        updateAnchoCarrusel:function(divContainer){
            var sep = parseInt($("#thumb_y1").css("margin-left"));//pongo el 1 y no el 0 porque así sé que hay más de uno
            var w = (parseInt($("#thumb_y1").css("width"))+sep)*Front.yutub.arrVideos.length - sep;
            //$("#thumbsVideos .mascara .thumbs").css({"width":w+"px"});
           divContainer.css({"width":w+"px"});

            //var ancho = parseInt($("#thumbsVideos .mascara").css("width"));
            var ancho = parseInt(divContainer.parent().css("width"));//dejé comentado arriba pa que cachen si lo hiciera a mano
            var anchoTotal = parseInt(divContainer.css("width"));

            if(anchoTotal < ancho){
            	// esto es para ocultar/desabilitar/asignar alpha a un eventual boton de carrusel
                //$(".btnCarruselY").hide();
            }
        },
        mueveThumbs:function(dir, divContainer){
            var ancho = parseInt(divContainer.parent().css("width"));
            var anchoTotal = parseInt(divContainer.css("width"));
            var limite = anchoTotal-ancho;

            if(!Front.yutub.animando){
                Front.yutub.animando = true;
                var l = parseInt(divContainer.css("left"));
                
                if(dir === "R"){
                    if(l*-1 <= limite){
                        TweenMax.to(divContainer, 0.5, {left:"-="+ancho, onComplete:function(){
                            Front.yutub.animando = false;
                            console.log("FIN ANIM R");
                        }});
                    } else {
                        Front.yutub.animando = false;
                    }
                } else {
                    if(l < 0){
                        TweenMax.to(divContainer, 0.5, {left:"+="+ancho, onComplete:function(){
                            Front.yutub.animando = false;
                            console.log("FIN ANIM L");
                        }});
                    } else {
                         Front.yutub.animando = false;
                    }
                }
            }
            
        }
    }
};
function onYouTubeIframeAPIReady(){
    Front.yutub.ponVideoYoutube(0);   
}
