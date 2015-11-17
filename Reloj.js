var css = {
	fontSize:"130px",
	paddingTop:"0px",
	height:"132px",
	width:"96px",
	widthSpecial:"20px",
	fixForCenter:"-20px",
	marginTop:"0px",
	marginLeft:"0px",
	marginRight:"5px",
	marginBottom:"0px",
	backgroundColor:"#282828",
	backgroundColorLuz:"#494949",
	backgroundColorSombra:"#060606",
	border:"4px",
	borderColor:"#000",
	borderRadiusInner:"6px",
	borderRadiusOuter:"10px",
	shadow:"2px 2px 10px rgba(0, 0, 0, 0.6)",
	color:"#FFFFFF",
	altoLineaMedio:2,
	fontSizeCharacterSpecial:"40px",
	fixForCenterSpecial:"-5px",
	escalaNumFinales:0.5
};

var tiempoGiro = 0.8;

var Reloj = {
	chars:[],
	init:function(container){
		$("#text").bind("keydown",function(e) {
			// e.preventDefault();
		});

		$("#text").bind("keyup",function(e) {
			e.preventDefault();
			var text = $("#text").val();
			var chars = text.split("");
			
			for (var j = 0; j < $(container).children("div").length; j++) {
				$(container + " .rn"+j).hide();
				if(j > chars.length){
					Reloj.chars[j] = " ";
					Reloj.updateChar(container,j," ");
				}
			}
			for (var i = 0; i < chars.length; i++) {
				console.log("TEXT: "+text+" i: "+i);
				Reloj.creaCaracter(container,chars[i], i);
			}
			Reloj.updateTexto(container,text);
		});

	},
	creaCaracter:function(container,char,i, special, seEscala) {
		var childs = $(container).children("div").length;

		if(i<childs){$(container +" .rn"+i).show(); return;}
		if(!special){
			$(container).append("<div class='rn"+i+" caracterContainer'></div>");
			$(container+" .rn"+i).append('<div class="back"><div class="arr"><p>'+char+'</p></div><div class="aba"><p class="fix">'+char+'</p></div></div><div class="front"><div class="arr"><p>'+char+'</p></div><div class="aba"><p class="fix">'+char+'</p></div></div>');
			if(seEscala){
				$(container+" .rn"+i).addClass("escalado");
			}
		} else {
			$(container).append("<div class='rn"+i+" caracterContainerSpecial'></div>");
			$(container+" .rn"+i).append('<p class="pSpecial">'+char+'</p>');
		}
		
		Reloj.csseame(container);
	},
	csseame:function(container){
		// reset previo
		$(container +" div").css({"margin":"0", "padding":"0"});
		$(container +" p").css({"margin":css.fixForCenter +" 0 0 0", "padding":"0"});
		
		$(container +" .caracterContainer").css({"color":css.color, "height":css.height,"width":css.width,"float":"left", "position":"relative", "font-size":css.fontSize, margin:css.marginTop +" "+css.marginRight+" "+css.marginBottom+" "+css.marginLeft, "border":css.border +" solid "+css.borderColor,"border-radius":css.borderRadiusOuter, "box-shadow": css.shadow});

		$(container +" .back").css({"height":"100%","position":"absolute", "width":"100%", "backgroundColor":css.borderColor,"border-radius":css.borderRadiusOuter});
		$(container +" .front").css({"height":"100%","position":"absolute", "width":"100%", "backgroundColor":css.borderColor,"border-radius":css.borderRadiusOuter});

		$(container +" .arr").css({
			"backgroundColor":css.backgroundColor,
			"text-align":"center", 
			"height":(((parseInt(css.height)*0.5)-parseInt(css.paddingTop))-css.altoLineaMedio)+"px",
			"position":"absolute", 
			"width":"100%", 
			"overflow":"hidden",
			"margin-top":"0",
			"border-radius":css.borderRadiusInner +" "+css.borderRadiusInner+" 0 0",
			"padding":css.paddingTop+" 0 0 0"
			});

		$(container +" .aba").css({
			"backgroundColor":css.backgroundColor,
			"text-align":"center",
			"height":((parseInt(css.height)*0.5)-parseInt(css.paddingTop))+"px",
			"position":"absolute",
			"width":"100%",
			"overflow":"hidden",
			"margin-top":(parseInt(css.height)*0.5)+"px",
			"border-radius":"0 0 "+css.borderRadiusInner +" "+css.borderRadiusInner,
			"padding":css.paddingTop+" 0 0 0"
		});

		$(container +" .aba .fix").css({"margin-top":"-"+(parseInt(css.height)*0.5 - parseInt(css.fixForCenter))+"px"});

		$(container +" .caracterContainerSpecial").css({"color":css.color, "height":css.height,"width":css.widthSpecial,"float":"left", "position":"relative", "font-size":css.fontSize, margin:css.marginTop +" "+css.marginRight+" "+css.marginBottom+" "+css.marginLeft, "text-shadow": css.shadow});

		var hSpecial = $(container +" .caracterContainerSpecial .pSpecial").height();
		var medio = parseInt(css.height)*0.5 + parseInt(css.border) - hSpecial*0.5 + parseInt(css.fixForCenterSpecial);
		$(container +" .caracterContainerSpecial .pSpecial").css({"text-align":"center", "font-size":css.fontSizeCharacterSpecial, "margin-top":medio+"px"});

		
		$(container +" .escalado").each(function(i){
			var val = 1 - css.escalaNumFinales;
			var mr = (((i*parseInt(css.width))*val)+(parseInt(css.marginLeft)*val))*-1;
			console.log("hola: "+mr);
			TweenMax.set($(this),{scale:css.escalaNumFinales, marginLeft:mr+"px", transformOrigin:"top left"});
		});

	},
	creaReloj:function(container, regresivo, fecha){
		if(regresivo){
			Reloj.chars = Reloj.dameLaHoraFutura(fecha).split("");
		} else {
			Reloj.chars = Reloj.dameLaHora().split("");
		}

		for (var i = 0; i < Reloj.chars.length; i++) {
			if(Reloj.chars[i] == ":"){
				Reloj.creaCaracter(container,Reloj.chars[i], i, true);
			} else {
				console.log(i + " / " + Reloj.chars.length);
				if(i == Reloj.chars.length-2 || i == Reloj.chars.length-1){
					Reloj.creaCaracter(container,Reloj.chars[i], i, false, true);
				} else {
					Reloj.creaCaracter(container,Reloj.chars[i], i);
				}
			}
		}
		Reloj.csseame(container);

		if(regresivo){
			Reloj.updateRegresivo(container, fecha);
		} else {
			Reloj.updateHora(container);
		}
	},
	updateHora:function(container){
		Reloj.updateTexto(container,Reloj.dameLaHora());
		var t = setTimeout(function(){Reloj.updateHora(container);},1000);
	},
	intervalRegresivo: null,
	updateRegresivo:function(container, fecha){
		//console.log(fecha);
		Reloj.updateTexto(container, Reloj.cuentaRegresiva(container, fecha));
		if(Reloj.intervalRegresivo == null){
			Reloj.intervalRegresivo = setInterval(function(){Reloj.updateRegresivo(container, fecha);},1000);
		}
		
	},
	creaCuentaRegresiva:function(container, horas, minutos, segundos){
		if(horas == undefined){			horas = 0;	}
		if(minutos == undefined){		minutos = 0;	}
		if(segundos == undefined){		segundos = 0;	}
		var fecha=new Date(); // esto es hoy a esta hora
		var h=fecha.getHours();
		var m=fecha.getMinutes();
		var s=fecha.getSeconds();
		fecha.setHours(h+horas); // le sumo la horas que quiero
		fecha.setMinutes(m+minutos); // le sumo los minutos que quiero
		fecha.setSeconds(s+segundos); // le sumo los segundos que quiero
		
		Reloj.creaReloj(container, true, fecha);
	},
	cuentaRegresiva:function(container, fecha){
	    var hoy=new Date();
	    var d=0; // por si acaso lo necesitaramos
	    var h=0;
	    var m=0;
	    var s=0;

	    if (fecha>hoy){
	        var diferencia=(fecha.getTime()-hoy.getTime())/1000;
	        d=Math.floor(diferencia/86400);
	        diferencia=diferencia-(86400*d);
	        h=Math.floor(diferencia/3600);
	        diferencia=diferencia-(3600*h);
	        m=Math.floor(diferencia/60);
	        diferencia=diferencia-(60*m);
	        s=Math.floor(diferencia);
	    } else {
	    	clearTimeout(Reloj.intervalRegresivo);
	    	console.log("ya ha pasado el tiempo límite");
	    }
	    d = Reloj.daFormatoHora(d); // por si acaso
	    h = Reloj.daFormatoHora(h);
	    m = Reloj.daFormatoHora(m);
	    s = Reloj.daFormatoHora(s);
	    return h.toString()+":"+m.toString()+s.toString();
	},
	updateTexto:function(container,st){
		var tempChars = st.split("");
		for (var i = 0; i < tempChars.length; i++) {
			if(tempChars[i] != Reloj.chars[i]){
				Reloj.updateChar(container,i,tempChars[i]);
				Reloj.chars[i] = tempChars[i];
			}
		}
	},
	updateChar:function(container, cualDiv, char){
		var a1 = $(container +" .rn"+cualDiv+" .back .arr");
		var a2 = $(container +" .rn"+cualDiv+" .back .aba");
		var b1 = $(container +" .rn"+cualDiv+" .front .arr");
		var b2 = $(container +" .rn"+cualDiv+" .front .aba");

		a1.css("z-index","1");
		a2.css("z-index","2");
		b1.css("z-index","3");
		b2.css("z-index","4");

		a1.children("p").text(char.toString());
		
		TweenMax.set(b1,{rotationX:0,transformStyle:"preserve-3d",  transformOrigin:"top center", backgroundColor:css.backgroundColor});
		TweenMax.set(a2,{rotationX:90,transformStyle:"preserve-3d", transformOrigin:"top center", backgroundColor:css.backgroundColorLuz});

		a1.css("background-color", css.backgroundColor);
		b2.css("background-color", css.backgroundColor);
		
		TweenMax.to(b1, tiempoGiro*0.5,{rotationX:90,transformStyle:"preserve-3d", transformOrigin:"bottom center", backgroundColor:css.backgroundColorSombra, ease:Quart.easeIn, onComplete:function(){
			a2.css("z-index","4");
			b1.css("z-index","2");
			b2.css("z-index","3");
			a2.children("p").text(char.toString());
			b1.children("p").text(char.toString());
			TweenMax.to(a2, tiempoGiro*0.5,{rotationX:0,transformStyle:"preserve-3d", ease:Quart.easeOut, backgroundColor:css.backgroundColor, onComplete:function(){
				b2.children("p").text(char.toString());
			}});
		}});

	},
	daFormatoHora:function(i) {
	    if (i<10) {i = "0" + i;}
	    return i;
	},
	dameLaHora:function(){
		var today=new Date();
	    var h=today.getHours();
	    var m=today.getMinutes();
	    var s=today.getSeconds();
	    h = Reloj.daFormatoHora(h);
	    m = Reloj.daFormatoHora(m);
	    s = Reloj.daFormatoHora(s);
	    // return h+":"+m+":"+s;
	    return h.toString()+":"+m.toString()+s.toString();
	    // return h.toString()+m.toString()+s.toString();
	},
	dameLaHoraFutura:function(fecha){
		//console.log(fecha);
	    var h=fecha.getHours();
	    var m=fecha.getMinutes();
	    var s=fecha.getSeconds();
	    h = Reloj.daFormatoHora(h);
	    m = Reloj.daFormatoHora(m);
	    s = Reloj.daFormatoHora(s);
	    // return h+":"+m+":"+s;
	    return h.toString()+":"+m.toString()+s.toString();
	    // return h.toString()+m.toString()+s.toString();
	}
};

$(document).ready(function(){
  // Si quieres crear un reloj normal pasas el div contenedor
	// Reloj.creaReloj("#container");
	
	// si quieres crea una cuenta regresiva pasas el div, horas, minutos y segundos (en el ejemplo es 2 horas y 3 segundos a partir de ahora)
	Reloj.creaCuentaRegresiva("#container", 2, 0, 3);
	
	// si por otro lado quieres hacer lo mismo pero con cualquier letra, en tu html debes tener un input text con id "text"
	y llamas a la función init
	// Reloj.init("#container");
});
