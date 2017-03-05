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
// DEBO ACTUALIZAR ESTO PRONTO, todas las funciones han mejorado.
//  ¯\_(ツ)_/¯

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

var cLoader={
    diametro:330,                // tamaño total del canvas
    anchoLinea1:1,              // es la linea de abajo
    anchoLinea2:1,               // es la linea de arriba
    color1:"#cccccc",            // es la linea de abajo. Puede ser rgba()
    color2:"#ffffff",            // es la linea de arriba. Puede ser rgba() tambien puede ser más gruesa que la anterior, no importa.
    colorTexto:"#ffffff",        // Puede ser rgba()
    sizeFont:20,                 // tamaño en pixeles
    font:"sans-serif",                   // nombre de la fuente
    lineJoin:"round",            // "bevel" || "round" || "miter"
    lineCap:"round",             // "bevel" || "round" || "miter"
    from:"CENTRO",               // "DENTRO" || "FUERA" || "CENTRO"
    posTextY:0.5//,                // posición relativa a la del canvas, del texto. de 0 a 1
    // backgroundColor:"rgba(255,255,255,0.9)"    // color del rectángulo contenedor. Puede ser rgba()
};

var Preload = {
    imagesArray:["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"],
    load:function(donde, imagesArray, callback, params ){
        imagesArray = imagesArray.map(function(cont, i){
            return "img/" + cont;
        });
        // console.log("IMG FOR PRELOAD: "+imagesArray);
        var position = "absolute";
        if(donde == "body"){position = "fixed";}
        var wdonde = $(donde).width();
        var hdonde = $(donde).height();
        $(donde).append('<div id="cargador"></div>');
        var cargador = $("#cargador");
        cargador.css({"position":position, "width":"100%", "height":"100%","margin": "0","top":"0","left":"0","z-index": "9000"});
        
        // return;
        cargador.append('<canvas class="canv" id="canvasCargador"></canvas>');
        var canv = document.getElementById("canvasCargador");
        var dc = canv.getContext('2d');

        var canvi = $("#canvasCargador");
        canvi.css({"position":position,"margin": "0","top":"0","left":"0","z-index": "9002"});

        // instantiate the pre-loader with an onProgress and onComplete handler y que tener el preLoaderIMG.js cargado
        new preLoaderIMG(imagesArray, {
            pipeline:true,
            onProgress: function(img, imageEl, index){
                
                var percent = Math.floor((100 / this.queue.length) * this.completed.length);
            
                Preload.dibujaCargadorCircular(dc,percent/100,{anchoLinea1:3,anchoLinea2:3,color2:"#9F2619", texto:"Cargando imágenes ", sizeFont:15});
                canvi.css({"top":(hdonde * 0.5 - cLoader.diametro*0.5)+"px", "left":(wdonde * 0.5 - cLoader.diametro*0.5)+"px"});
                
                //console.log(this.completed.length + this.errors.length + ' / ' + this.queue.length + ' done');
            }, 
            onComplete: function(loaded, errors){
                
                cargador.remove();
                
                if (typeof callback === "function") {callback(params);}
                
                if (errors){
                    console.log('the following failed', errors);
                }
            }
        });
    },
    dibujaCargadorCircular:function(ctx, porcentaje, o){

        o = (o !== undefined) ? o : {};
        o.w = (o.w !== undefined) ? o.w : 300;                                  // tamaño total del canvas
        o.h = (o.h !== undefined) ? o.h : 300;                                  // tamaño total del canvas
        o.linew1 = (o.anchoLinea1 !== undefined) ? o.anchoLinea1 : 1;           // es la linea de abajo
        o.linew2 = (o.anchoLinea2 !== undefined) ? o.anchoLinea2 : 1;           // es la linea de arriba
        o.color1 = (o.color1 !== undefined) ? o.color1 : "#222222";             // es la linea de abajo. Puede ser rgba()
        o.color2 = (o.color2 !== undefined) ? o.color2 : "#ffffff";             // es la linea de arriba. Puede ser rgba() tambien puede ser más gruesa que la anterior, no importa.
        o.colorTexto = (o.colorTexto !== undefined) ? o.colorTexto : "#ffffff"; // Puede ser rgba()
        o.sizeFont = (o.sizeFont !== undefined) ? o.sizeFont : 20;              // tamaño en pixeles
        o.font = (o.font !== undefined) ? o.font : "sans-serif";                // nombre de la fuente 
        o.lineJoin = (o.lineJoin !== undefined) ? o.lineJoin : "round";         // "bevel" || "round" || "miter"
        o.lineCap = (o.lineCap !== undefined) ? o.lineCap : "round";            // "bevel" || "round" || "miter"
        o.from = (o.from !== undefined) ? o.from : "CENTRO";                    // "DENTRO" || "FUERA" || "CENTRO"
        o.posTextY =(o.posTextY !== undefined) ? o.posTextY : 0.5;              // posición relativa del texto. De 0 a 1
        o.texto =(o.texto !== undefined) ? o.texto : "";                        // texto que acompaña al porcentaje

        var cx,cy,rad,rad2,gra,offAngle;

        ctx.canvas.width = o.w;
        ctx.canvas.height = o.h;
        ctx.clearRect(0,0,o.w,o.h);

        cx = o.w*0.5;
        cy = o.h*0.5;

        // ctx.drawImage(sprite, cx-sprite.width*0.5, cy-sprite.height*0.5, sprite.width, sprite.height);

        if(o.linew1>o.linew2){
            rad = (o.w*0.5)-(o.linew1*0.5);
            switch(o.from)
            {
                case "DENTRO":
                    rad2 = (o.w*0.5)-(o.linew2*0.5)-(o.linew1-o.linew2);  //DENTRO
                break;
                case "FUERA":
                    rad2 = (o.w*0.5)-(o.linew2*0.5);                  //FUERA
                break;
                case "CENTRO":
                    rad2 = (o.w*0.5)-(o.linew2*0.5)-(o.linew1-o.linew2)*0.5; //CENTRO
                break;
            } 
        } else {
            rad = (o.w*0.5)-(o.linew2*0.5);
            switch(o.from)
            {
                case "DENTRO":
                    rad2 = (o.w*0.5)-(o.linew1*0.5)-(o.linew2-o.linew1);  //DENTRO
                break;
                case "FUERA":
                    rad2 = (o.w*0.5)-(o.linew1*0.5);                  //FUERA
                break;
                case "CENTRO":
                     rad2 = (o.w*0.5)-(o.linew1*0.5)-(o.linew2-o.linew1)*0.5; //CENTRO
                break;
            }            
        }

        gra = (porcentaje*360)*(Math.PI/180);
        offAngle = -Math.PI*0.5;

        // LINEA 1
        ctx.beginPath();
        // ctx.fillStyle='#FFFFFF';
        ctx.lineJoin = o.lineJoin;
        ctx.lineCap = o.lineJoin;
        ctx.strokeStyle = o.color1;
        ctx.lineWidth = o.linew1;
        ctx.arc(cx, cy, rad, offAngle+0,offAngle+2*Math.PI, false);
        // ctx.fill();
        ctx.stroke();

        // LINEA 2
        ctx.beginPath();
        ctx.lineJoin = o.lineJoin;
        ctx.lineCap = o.lineJoin;
        ctx.lineWidth = o.linew2;
        ctx.strokeStyle = o.color2;
        ctx.arc(cx, cy, rad2, offAngle+0,offAngle+gra, false);
        // ctx.fill(); 
        ctx.stroke();

        // TEXTO
        ctx.font= o.sizeFont + "px " + o.font;
        ctx.fillStyle = o.colorTexto;
        ctx.textAlign="center";
        ctx.textBaseline = "middle";

        // ctx.shadowColor = o.color1;
        // ctx.shadowOffsetX = 0;
        // ctx.shadowOffsetY = 0;
        // ctx.strokeStyle = o.color1;
        // ctx.shadowBlur  = 2;
        // ctx.lineWidth   = 2;
        // ctx.strokeText(parseInt(p*100)+"%",o.w*0.5,o.h*0.5);
        // ctx.shadowBlur = 0;
        ctx.fillText(o.texto + parseInt(porcentaje*100)+"%",o.w*0.5,o.h*o.posTextY);

        // Front.w = $(window).width();
        // Front.h = $(window).height();

    }
};
