/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004
 Copyright (C) 2015 Luis Donaire Casanova <donaire.luis@gmail.com>
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
  0. You just DO WHAT THE FUCK YOU WANT TO.
  
 nov 2015
Creada por su servidor, su amigable y guapo vecino el Formidable Señor Landaes.
si quieres contactarme:
	donaire.luis@gmail.com
	@luisinlandaes

⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓
	UPDATES:
	25 nov 2015:
	En el caso del reloj en cuenta regresiva, hice que despachara un evento cuando termina.
	Se accede de la siguiente forma:

		Si quieres acceder desde el body: (es el comportamiento por default)
			document.body.addEventListener("END_TIME_REVERSED", Reloj.onStopTime, true);

		Si quieres que el listener esté más acotado, entonces comenta la línea anterior en el código y en la función 'cuentaRegresiva' descomenta:

		 // document.getElementById(container.substring(1)).addEventListener("END_TIME_REVERSED", Reloj.onStopTime, false);

		En ambos casos el listener es Reloj.onStopTime, pero por supuesto, tu puedes poner el listener que se te dé la gana.

⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓
*/


var css = {
	fontSize:"132px",				// tamaño de la fuente
	paddingTop:"0px",				// para la meyor parte de las fuentes dejar en 0
	height:"132px",					// altura del rectángulo interior
	width:"96px",					// ancho del rectángulo interior
	fixForCenter:"-20px",				// cantidad de pixeles casi siempre en negativo para centrar verticalmente la fuente
	marginTop:"0px",				// casi siempre en 0, distancia entre rectángulos
	marginLeft:"0px",				// casi siempre en 0, distancia entre rectángulos
	marginRight:"5px",				// distancia entre rectángulos
	marginBottom:"0px",				// casi siempre en 0, distancia entre rectángulos
	backgroundColor:"#282828",			// color dominante del rectángulo (puede ser rgba())
	backgroundColorLuz:"#494949",			// color ligeramente brillante del rectángulo (puede ser rgba())
	backgroundColorSombra:"#060606",		// color ligeramente oscuro del rectángulo (puede ser rgba())
	border:"4px",					// tamaño del borde
	borderColor:"#000",				// color del borde
	borderRadiusInner:"6px",			// radio de borde del rectángulo interno
	borderRadiusOuter:"10px",			// radio de borde del rectángulo externo (lo hice así para conseguir distintos efectos);
	shadow:"2px 2px 10px rgba(0, 0, 0, 0.6)",	// parametros de box shadow del rectángulo externo
	color:"#FFFFFF",				// color de la fuente
	altoLineaMedio:2,				// espacio de separación entre la parte de arriba y la de abajo (puede ser 0)
	fontSizeCharacterSpecial:"40px",		// tamaño fuente del caracter especial (en casi todos los casos es ':' sin las comillas)
	fixForCenterSpecial:"-5px",			// cantidad de pixeles casi siempre en negativo para centrar verticalmente la fuente
	widthSpecial:"20px",				// ancho del caracter especial (en casi todos los casos es ':' sin las comillas)
	escalaNumFinales:0.5,				// escala de los segunderos (si quieres todos los caracteres iguales, setea esto en 1)
	arrImg:"img/backArr.png",			// imagen opcional de la parte de arriba, se puede conseguir un mejor efecto 
	abaImg:"img/backAba.png"			// imagen opcional de la parte de abajo, se puede conseguir un mejor efecto
};

var tiempoGiro = 0.8;					// valor en segundos, recomiendo no cambiar (con otros valores queda raro).

var Reloj = {
	chars:[],
	texto:function(container){
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
			"padding":css.paddingTop+" 0 0 0",
			"background-image": "url('"+css.arrImg+"')",
    		"background-position": "bottom center",
    		"background-size": "cover"
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
			"padding":css.paddingTop+" 0 0 0",
			"background-image": "url('"+css.abaImg+"')",
    		"background-position": "top center",
    		"background-size": "cover"
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
		Reloj.updateTexto(container, Reloj.cuentaRegresiva(container, fecha));
		if(Reloj.intervalRegresivo == null){
			Reloj.intervalRegresivo = setInterval(function(){Reloj.updateRegresivo(container, fecha);},1000);
		}
	},
	creaCuentaRegresiva:function(container, horas, minutos, segundos){
		if(horas == undefined){			horas = 0;		}
		if(minutos == undefined){		minutos = 0;	}
		if(segundos == undefined){		segundos = 0;	}
		var fecha=new Date(); // esto es hoy a esta hora
		var h=fecha.getHours();
		var m=fecha.getMinutes();
		var s=fecha.getSeconds();
		fecha.setHours(h+horas); // le sumo la horas que quiero
		fecha.setMinutes(m+minutos); // le sumo los minutos que quiero
		fecha.setSeconds(s+segundos); // le sumo los segundos que quiero
		// console.log(fecha);
		Reloj.creaReloj(container, true, fecha);
	},
	cuentaRegresiva:function(container, fecha){
		// console.log("hola" + fecha);
	    var hoy=new Date();
	    var d=0; //por si acaso ↦ voy a implementarlo con días la próxima vez
	    var h=0;
	    var m=0;
	    var s=0;

	    if (fecha>hoy){
	        var diferencia=(fecha.getTime()-hoy.getTime())/1000;
	        d=Math.floor(diferencia/86400);//por si acaso ↦ voy a implementarlo con días la próxima vez
	        diferencia=diferencia-(86400*d);
	        h=Math.floor(diferencia/3600);
	        diferencia=diferencia-(3600*h);
	        m=Math.floor(diferencia/60);
	        diferencia=diferencia-(60*m);
	        s=Math.floor(diferencia);
	    } else {
	    	clearTimeout(Reloj.intervalRegresivo);
	    	var despacha = new CustomEvent("END_TIME_REVERSED");
            // document.getElementById(container.substring(1)).addEventListener("END_TIME_REVERSED", Reloj.onStopTime, false);
            document.getElementById(container.substring(1)).dispatchEvent(despacha);
	    }
	    d = Reloj.daFormatoHora(d); //por si acaso ↦ voy a implementarlo con días la próxima vez
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
		console.log(fecha);
	    var h=fecha.getHours();
	    var m=fecha.getMinutes();
	    var s=fecha.getSeconds();
	    h = Reloj.daFormatoHora(h);
	    m = Reloj.daFormatoHora(m);
	    s = Reloj.daFormatoHora(s);
	    // return h+":"+m+":"+s;
	    return h.toString()+":"+m.toString()+s.toString();
	    // return h.toString()+m.toString()+s.toString();
	},
	onStopTime:function(e){
		e = e || event;
		console.log(e);
		alert("fin del tiempo");
		//var target = e.target || e.srcElement;
		//console.log(target);
	}
};

document.body.addEventListener("END_TIME_REVERSED", Reloj.onStopTime, true);


// ↓↓↓↓ lo siguiente es un polyfill para explorer 9 en adelante ↓↓↓↓
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
// ↑↑↑↑ hasta acá ↑↑↑↑


$(document).ready(function(){
	// Si quieres crear un reloj normal pasas el div contenedor
	// Reloj.creaReloj("#container");
	
	// si quieres crea una cuenta regresiva pasas el div, horas, minutos y segundos (en el ejemplo es 0 horas 0 minutos y 3 segundos a partir de ahora)
	Reloj.creaCuentaRegresiva("#container", 0, 0, 3);
	
	// si por otro lado quieres hacer lo mismo pero con cualquier letra, en tu html debes tener un input text con id "text"
	// y llamas a la función texto
	// Reloj.texto("#container");
});
