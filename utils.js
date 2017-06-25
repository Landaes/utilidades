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

var Utils = {
	parseNumeroConPuntos:function(st){
        var reversed = st.split("").reverse().join("");
        var finalST;
        var partes = [];
        for (var i = 0; i < reversed.length; i += 3) {
            var tmp = reversed.substring(i, i+3);
            var goodtmp = tmp.split("").reverse().join("") + ".";
            partes.push(goodtmp);
        }

        finalST = partes.reverse().join("");

        var n = finalST.lastIndexOf(".");

        finalST = finalST.substring(0,n);

        return "$"+finalST;
    },
	scroll:function(div,dif,time){
        var offset = div.offset();
        if(dif === undefined){
            dif = 0;
        }
        if(time === undefined){
            time = 1;
        }
        // console.log(offset.top);
        TweenMax.to(window,time,{scrollTo:{y:offset.top - dif}});
    },
    isNumberKey:function(event){
        var key = window.event ? event.keyCode : event.which;
        if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
            return true;
        } else if ( key < 48 || key > 57 ) {
            return false;
        } 
        else return true;
    },
    validaRut:function(rut){
        var rutCompleto = this.reformatRut(rut);
        rutCompleto = rutCompleto.split(".").join("");
        if (!/^[0-9]+-[0-9kK]{1}$/.test( rutCompleto )){
            return false;
        }
        var tmp     = rutCompleto.split('-');
        var digv    = tmp[1]; 
        var rutN    = tmp[0];
        if(digv == 'K') { 
            digv = 'k';
        }
        return (this.dv(rutN) == digv);
    },
    dv:function(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10)){
            S=(S+T%10*(9-M++%6))%11;
        }
        return S?S-1:'k';
    },
    reformatRut:function(rutN){
        var rut,rutTMP,rutVer;
        rutN = rutN.split('.').join("");
        if(rutN.charAt(rutN.length-2) == "-"){
            rut = rutN;
        } else {
            rutTMP = rutN.substring(0,rutN.length-1);
            rutVer = rutN.charAt(rutN.length-1);
            rut = rutTMP + "-" + rutVer;
        }
        var part1, part2, part3;

        part1 = rut.substring(rut.length-5,rut.length);
        part2 = rut.substring(rut.length-8,rut.length-5);
        part3 = rut.substring(0,rut.length-8);

        return part3+"."+part2+"."+part1;
    },
    showErrors:function(cual){
        TweenMax.fromTo(cual,0.2,{scale:1, backgroundColor:"#ffffff"},{scale:1.01,backgroundColor:"red", repeat:3, yoyo:true});
    },
    showErrorsRadio:function(cual){
        TweenMax.fromTo(cual,0.2,{scale:1, backgroundColor:"#ffffff"},{scale:1.01,backgroundColor:"red", repeat:3, yoyo:true});
    },
    validaMail:function(emailAddress){
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    },
    calcularEdad:function(dia, mes, ano){
        fecha_hoy = new Date();
        ahora_ano = fecha_hoy.getYear();
        ahora_mes = fecha_hoy.getMonth();
        ahora_dia = fecha_hoy.getDate();
        edad = (ahora_ano + 1900) - ano;
            
        if ( ahora_mes < (mes)){
          edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)){ 
          edad--;
        }
        if (edad > 1900){
            edad -= 1900;
        }

        var meses = 0;
        if(ahora_mes > mes)
            meses = ahora_mes-mes;
        if(ahora_mes < mes)
            meses = 12 - (mes - ahora_mes);
        if(ahora_mes == mes && dia > ahora_dia)
            meses = 11;
 
        var dias = 0;
        if(ahora_dia > dia)
            dias = ahora_dia - dia;
        if(ahora_dia < dia)
        {
           var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
            dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        return [edad,meses,dias];
    },
    isMobile: function(){
        var isMobile = false; //initiate as false
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){isMobile = true;} 
        
        return isMobile;
    },
    parsePrecio:function(valor){
        var st = valor.toString();
        st = st.replace(".",",");
        var i = st.indexOf(",");
        var final = st.substring(i,st.length);
        var medio = st.substring(i-3,i);
        var inicio = st.substring(0,i-3);        

        return inicio+"."+medio/*+final*/;
    },
    parseTelefono:function(st){
        var part1, part2, part3;

        part1 = st.substring(st.length-2,st.length);
        part2 = st.substring(st.length-4,st.length-2);
        part3 = st.substring(st.length-7,st.length-4);
        part4 = st.substring(0,st.length-7);

        console.log(part4, part3, part2, part1);

        return part4 + " " + part3 + " " + part2 + " "+ part1;
    },
    checkForExplorer:function(){
        if (/MSIE 10/i.test(navigator.userAgent)) {
           // This is internet explorer 10
           $("html").addClass("ie");
        }

        if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
            // This is internet explorer 9 or 11
            $("html").addClass("ie");
        }

        if (/Edge\/\d./i.test(navigator.userAgent)){
           // This is Microsoft Edge
           $("html").addClass("ie");
        }
    },
    llenarSelectTelefonos:function(div){
        var codes = ["código",9, 2, 32, 33, 34, 35, 41, 42, 43, 45, 51, 52, 53, 55, 57, 58, 61, 63, 64, 65, 67, 71, 72, 73, 75];
        //<option value="02">02</option>

        for (var i = 0; i < codes.length; i++) {
            // codes[i]
            div.append("<option value='"+codes[i]+"'>"+codes[i]+"</option>");
        }
    }
};
