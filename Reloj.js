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
si quieres contactarme para felicitarme, darme las gracias, invitarme a comer helado o corregir algún bug:
	http://www.landaes.cl
	donaire.luis@gmail.com
	@luisinlandaes

⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓
	UPDATES:
	10 marzo 2018
	-Pequeño problema de visualización de corner-radius solucionado.
	
	25 febrero 2018
	-La función de cuenta regresiva está mejorada.
	(antes no finalizaba correctamente)
	
	22 enero 2016
	-El 'css' lo integré dentro del mismo objeto Reloj, es decir ahora tiene valores por defecto que se pueden cambiar en tiempo de ejecución de la siguiente forma:
		
		var obj = {}; // <-- este objeto lo explico en seguida*
		
		Reloj.doStyle(obj,"#container");
		
	*Explicación: Este objeto puede recibir los siguientes parámetros: fontSize, paddingTop, height, width, fixForCenter, marginTop, marginLeft, marginRight, marginBottom, backgroundColor, backgroundColorLuz, backgroundColorSombra, border, borderColor, borderRadiusInner, borderRadiusOuter, shadow, color, altoLineaMedio, fontSizeCharacterSpecial, fixForCenterSpecial, widthSpecial, escalaNumFinales, arrImg, abaImg.
	pueden ser valores numéricos ej: 20 o puede nser valores en pixeles ej: "20px" cuando corresponda. En el mismo código está explicado para qué sirven c/u.

	-Reemplacé el evento por un callback a una función.


	20 enero 2016
	-Eliminé todas las referencias explícitas del tipo: Reloj.nombreFuncion, por this.nombreFuncion dentro del mismo objeto.

	25 nov 2015:
	-En el caso del reloj en cuenta regresiva, hice que despachara un evento cuando termina. (DEPRECADO, ya no existe, lo reemplacé como ya dije por un callback)

⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓
*/

var Reloj = {
	tiempoGiro:0.8,// valor en segundos, recomiendo no cambiar (con otros valores queda raro).
	chars:[],
	doStyle:function(css, container){
		if(this.css === undefined){
			this.css = (css !== undefined) ? css : {};
		}
		if(css !== undefined ){
			// tamaño de la fuente
			this.css.fontSize = (css.fontSize !== undefined) ? css.fontSize : (this.css.fontSize !== undefined) ? this.css.fontSize : 132;

			// para la mayor parte de las fuentes dejar en 0
			this.css.paddingTop = (css.paddingTop !== undefined) ? css.paddingTop :(this.css.paddingTop !== undefined) ? this.css.paddingTop : 0;

			// altura del rectángulo interior	
			this.css.height = (css.height !== undefined) ? css.height :(this.css.height !== undefined) ? this.css.height : 140;

			// ancho del rectángulo interior
			this.css.width = (css.width !== undefined) ? css.width :(this.css.width !== undefined) ? this.css.width :100;

			// cantidad de pixeles casi siempre en negativo para centrar verticalmente la fuente
			this.css.fixForCenter = (css.fixForCenter !== undefined) ? css.fixForCenter :(this.css.fixForCenter !== undefined) ? this.css.fixForCenter :-20;

			// casi siempre en 0, distancia entre rectángulos
			this.css.marginTop = (css.marginTop !== undefined) ? css.marginTop :(this.css.marginTop !== undefined) ? this.css.marginTop :0;
			this.css.marginLeft = (css.marginLeft !== undefined) ? css.marginLeft :(this.css.marginLeft !== undefined) ? this.css.marginLeft :0;
			this.css.marginRight = (css.marginRight !== undefined) ? css.marginRight :(this.css.marginRight !== undefined) ? this.css.marginRight :0;
			this.css.marginBottom = (css.marginBottom !== undefined) ? css.marginBottom :(this.css.marginBottom !== undefined) ? this.css.marginBottom :0;	

			// color dominante del rectángulo (puede ser rgba())
			this.css.backgroundColor = (css.backgroundColor !== undefined) ? css.backgroundColor :(this.css.backgroundColor !== undefined) ? this.css.backgroundColor :"#282828";

			// color ligeramente brillante del rectángulo (puede ser rgba())	
			this.css.backgroundColorLuz = (css.backgroundColorLuz !== undefined) ? css.backgroundColorLuz :(this.css.backgroundColorLuz !== undefined) ? this.css.backgroundColorLuz :"#494949";

			// color ligeramente oscuro del rectángulo (puede ser rgba())
			this.css.backgroundColorSombra = (css.backgroundColorSombra !== undefined) ? css.backgroundColorSombra :(this.css.backgroundColorSombra !== undefined) ? this.css.backgroundColorSombra :"#060606";

			// tamaño del borde
			this.css.border = (css.border !== undefined) ? css.border :(this.css.border !== undefined) ? this.css.border :4;

			// color del borde
			this.css.borderColor = (css.borderColor !== undefined) ? css.borderColor :(this.css.borderColor !== undefined) ? this.css.borderColor :"#000";

			// radio de borde del rectángulo interno. Sólo valores en pixeles. 
			this.css.borderRadiusInner = (css.borderRadiusInner !== undefined) ? css.borderRadiusInner :(this.css.borderRadiusInner !== undefined) ? this.css.borderRadiusInner :6;

			// radio de borde del rectángulo externo (lo hice así para conseguir distintos efectos). Sólo valores en pixeles.;
			this.css.borderRadiusOuter = (css.borderRadiusOuter !== undefined) ? css.borderRadiusOuter :(this.css.borderRadiusOuter !== undefined) ? this.css.borderRadiusOuter :10;

			// parámetros de box shadow del rectángulo externo
			this.css.shadow = (css.shadow !== undefined) ? css.shadow :(this.css.shadow !== undefined) ? this.css.shadow :"2px 2px 10px rgba(0, 0, 0, 0.6)";

			// color de la fuente
			this.css.color = (css.color !== undefined) ? css.color :(this.css.color !== undefined) ? this.css.color : "#FFF";

			// espacio de separación entre la parte de arriba y la de abajo (puede ser 0)
			this.css.altoLineaMedio = (css.altoLineaMedio !== undefined) ? css.altoLineaMedio :(this.css.altoLineaMedio !== undefined) ? this.css.altoLineaMedio :2;

			// tamaño fuente del caracter especial (en casi todos los casos es ':' sin las comillas)
			this.css.fontSizeCharacterSpecial = (css.fontSizeCharacterSpecial !== undefined) ? css.fontSizeCharacterSpecial :(this.css.fontSizeCharacterSpecial !== undefined) ? this.css.fontSizeCharacterSpecial :40;

			// cantidad de pixeles casi siempre en negativo para centrar verticalmente la fuente del caracter especial
			this.css.fixForCenterSpecial = (css.fixForCenterSpecial !== undefined) ? css.fixForCenterSpecial :(this.css.fixForCenterSpecial !== undefined) ? this.css.fixForCenterSpecial :-5;

			// ancho del caracter especial (en casi todos los casos es ':' sin las comillas)
			this.css.widthSpecial = (css.widthSpecial !== undefined) ? css.widthSpecial :(this.css.widthSpecial !== undefined) ? this.css.widthSpecial :20;

			// escala de los segunderos (si quieres todos los caracteres iguales, setea esto en 1)
			this.css.escalaNumFinales = (css.escalaNumFinales !== undefined) ? css.escalaNumFinales :(this.css.escalaNumFinales !== undefined) ? this.css.escalaNumFinales :1;

			// imagen opcional de la parte de arriba, se puede conseguir un mejor efecto 
			this.css.arrImg = (css.arrImg !== undefined) ? css.arrImg :(this.css.arrImg !== undefined) ? this.css.arrImg :"https://cloud.githubusercontent.com/assets/2848147/11349728/6e8bf3be-920c-11e5-82d9-651bca022e64.png";

			// imagen opcional de la parte de abajo, se puede conseguir un mejor efecto
			this.css.abaImg = (css.abaImg !== undefined) ? css.abaImg :(this.css.abaImg !== undefined) ? this.css.abaImg :"https://cloud.githubusercontent.com/assets/2848147/11349727/6e8955aa-920c-11e5-8c59-85cb684bf00c.png";

			try{
				this.csseame(container);
			} catch (err){
				console.log(err.message);
			}
		}
	},
	texto:function(container){
		$("#text").keydown(function(e) {
			// e.preventDefault();
		});

		$("#text").keyup(function(e) {
			e.preventDefault();
			var text = $("#text").val();
			var chars = text.split("");
			
			for (var j = 0; j < $(container).children("div").length; j++) {
				$(container + " .rn"+j).hide();
				if(j > chars.length){
					this.chars[j] = " ";
					this.updateChar(container,j," ");
				}
			}
			for (var i = 0; i < chars.length; i++) {
				this.creaCaracter(container,chars[i], i);
			}
			this.updateTexto(container,text);
		}.bind(this));

	},
	creaCaracter:function(container,char,i, special, seEscala) {
		var childs = $(container).children("div").length;
        
//        console.log("el hijo existe",$(container +" .rn"+i).length);

//		if(i<childs){$(container +" .rn"+i).show(); return;}
		if($(container +" .rn"+i).length > 0){$(container +" .rn"+i).show(); return;}
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
		

		if(this.css === undefined){
			this.doStyle.apply(this,[undefined, container]);
		} else {
			this.doStyle.apply(this,[{}, container]);
		}
	},
	csseame:function(container){
        // reset previo
        $(container +" div").css({"margin":"0", "padding":"0"});
        $(container +" p").css({"margin":parseInt(this.css.fixForCenter) +"px 0 0 0", "padding":"0"});

        $(container +" .caracterContainer").css({"color":this.css.color, "height":parseInt(this.css.height),"width":parseInt(this.css.width),"float":"left", "position":"relative", "font-size":parseInt(this.css.fontSize)+"px", margin:parseInt(this.css.marginTop) +"px "+parseInt(this.css.marginRight)+"px "+parseInt(this.css.marginBottom)+"px "+parseInt(this.css.marginLeft)+"px", "border":parseInt(this.css.border) +"px solid "+this.css.borderColor,"border-radius":parseInt(this.css.borderRadiusOuter)+"px", "box-shadow": this.css.shadow,"backgroundColor":this.css.borderColor,"box-sizing": "content-box"});

        $(container +" .back").css({"height":"100%","position":"absolute", "width":"100%", "backgroundColor":this.css.borderColor,"border-radius":parseInt(this.css.borderRadiusOuter)+"px"});
        $(container +" .front").css({"height":"100%","position":"absolute", "width":"100%", "backgroundColor":this.css.borderColor,"border-radius":parseInt(this.css.borderRadiusOuter)+"px"});

        $(container +" .arr").css({
            "backgroundColor":this.css.backgroundColor,
            "text-align":"center", 
            "height":(((parseInt(this.css.height)*0.5)-parseInt(this.css.paddingTop))-this.css.altoLineaMedio)+"px",
            "position":"absolute", 
            "width":"100%", 
            "overflow":"hidden",
            "margin-top":"0",
            "border-radius":parseInt(this.css.borderRadiusInner).toString() +"px "+parseInt(this.css.borderRadiusInner).toString()+"px 0 0",
            "padding":parseInt(this.css.paddingTop)+"px 0 0 0",
//	            "background-image": "url('"+this.css.arrImg+"')",
            "background-position": "bottom center",
            "background-size": "cover"
            });

        $(container +" .aba").css({
            "backgroundColor":this.css.backgroundColor,
            "text-align":"center",
            "height":((parseInt(this.css.height)*0.5)-parseInt(this.css.paddingTop))+"px",
            "position":"absolute",
            "width":"100%",
            "overflow":"hidden",
            "margin-top":(parseInt(this.css.height)*0.5)+"px",
            "border-radius":"0 0 "+parseInt(this.css.borderRadiusInner) +"px "+parseInt(this.css.borderRadiusInner)+"px",
            "padding":parseInt(this.css.paddingTop)+"px 0 0 0",
//	            "background-image": "url('"+this.css.abaImg+"')",
            "background-position": "top center",
            "background-size": "cover"
        });

        $(container +" .aba .fix").css({"margin-top":"-"+(parseInt(this.css.height)*0.5 - parseInt(this.css.fixForCenter))+"px"});

        $(container +" .caracterContainerSpecial").css({"color":this.css.color, "height":parseInt(this.css.height),"width":parseInt(this.css.widthSpecial)+"px","float":"left", "position":"relative", "font-size":parseInt(this.css.fontSize)+"px", margin:parseInt(this.css.marginTop) +"px "+parseInt(this.css.marginRight)+"px "+parseInt(this.css.marginBottom)+"px "+parseInt(this.css.marginLeft)+"px", "text-shadow": this.css.shadow});

        var hSpecial = $(container +" .caracterContainerSpecial .pSpecial").height();
        var medio = parseInt(this.css.height)*0.5 + parseInt(this.css.border) - hSpecial*0.5 + parseInt(this.css.fixForCenterSpecial);
        $(container +" .caracterContainerSpecial .pSpecial").css({"text-align":"center", "font-size":parseInt(this.css.fontSizeCharacterSpecial)+"px", "margin-top":medio+"px"});


        if($(container + " #escala_reloj").length < 1 && $(container +" .escalado").length === 2){
            var div = $("<div/>", {
                id: 'escala_reloj'
            });
            $(container +" .escalado").wrapAll('<div id="escala_reloj"></div>');
            $("#escala_reloj").css({
                "position":"relative",
                "float":"left"
            });
        }
        TweenMax.set("#escala_reloj",{scale:this.css.escalaNumFinales,transformOrigin:"top left"});
	
	},
	creaReloj:function(container, regresivo, fecha, callback){
		if(regresivo){
			this.chars = this.dameLaHoraFutura(fecha).split("");
//			this.callback = callback;
		} else {
			this.chars = this.dameLaHora().split("");
		}

		for (var i = 0; i < this.chars.length; i++) {
			if(this.chars[i] == ":"){
				this.creaCaracter(container,this.chars[i], i, true);
			} else {
				if(i == this.chars.length-2 || i == this.chars.length-1){
					this.creaCaracter(container,this.chars[i], i, false, true);
				} else {
					this.creaCaracter(container,this.chars[i], i);
				}
			}
		}

		this.csseame.call(this,container);

		if(regresivo){
            //console.log("en crea reloj", fecha.getSeconds());
			this.updateRegresivo(true,container, fecha, callback);
		} else {
			this.updateHora(container);
		}
	},
	updateHora:function(container){
		this.updateTexto(container,this.dameLaHora());
		var fn = function(){
			this.updateHora(container);
		};
		var t = setTimeout(fn.bind(this),1000);
	},
	intervalRegresivo: undefined,
	updateRegresivo:function(reloop,container, fecha, callback){
		this.updateTexto(container, this.cuentaRegresiva(container, fecha, callback));

		if(reloop){
//            console.log("LLAMADO: ",this,this.intervalRegresivo);
			var fn = function(){
				this.updateRegresivo(false, container, fecha, callback);
			};
			this.intervalRegresivo = setInterval(fn.bind(this),1000);
//			this.intervalRegresivo = setTimeout(fn.bind(this),1000);
		}
	},
	creaCuentaRegresiva:function(container, horas, minutos, segundos, callback){
		if(horas === undefined){		horas = 0;		}
		if(minutos === undefined){		minutos = 0;	}
		if(segundos === undefined){		segundos = 0;	}
		var fecha=new Date(); // esto es hoy a esta hora
		var h=fecha.getHours();
		var m=fecha.getMinutes();
		var s=fecha.getSeconds();
		fecha.setHours(h+horas); // le sumo la horas que quiero
		fecha.setMinutes(m+minutos); // le sumo los minutos que quiero
		fecha.setSeconds(s+segundos); // le sumo los segundos que quiero
		
		this.creaReloj(container, true, fecha, callback);
	},
	cuentaRegresiva:function(container, fecha, callback){
	    var hoy = new Date();
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
            clearInterval(this.intervalRegresivo);
	    	if(typeof(callback) === "function"){
	    		callback();
	    	}
	    }
	    d = this.daFormatoHora(d); //por si acaso ↦ voy a implementarlo con días la próxima vez
	    h = this.daFormatoHora(h);
	    m = this.daFormatoHora(m);
	    s = this.daFormatoHora(s);
	    return h.toString()+":"+m.toString()+":"+s.toString();
	},
    killRegresivo:function(callback){
        clearInterval(this.intervalRegresivo);
        if(typeof(callback) === "function"){
	    	callback();
	    }
    },
    dameSegundos:function(){
        var arrHMS = this.chars.join("").split(":");
        var segundos;
        segundos = ((parseInt(arrHMS[0])*60)*60) + (parseInt(arrHMS[1])*60) + parseInt(arrHMS[2]);
        return segundos;
    },
	updateTexto:function(container,st){
		var tempChars = st.split("");
		for (var i = 0; i < tempChars.length; i++) {
			if(tempChars[i] != this.chars[i]){
				this.updateChar(container,i,tempChars[i]);
				this.chars[i] = tempChars[i];
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
		
		TweenMax.set(b1,{rotationX:0,transformStyle:"preserve-3d",  transformOrigin:"top center", backgroundColor:this.css.backgroundColor});
		TweenMax.set(a2,{rotationX:90,transformStyle:"preserve-3d", transformOrigin:"top center", backgroundColor:this.css.backgroundColorLuz});

		a1.css("background-color", this.css.backgroundColor);
		b2.css("background-color", this.css.backgroundColor);
		
		TweenMax.to(b1, this.tiempoGiro*0.5,{rotationX:90,transformStyle:"preserve-3d", transformOrigin:"bottom center", backgroundColor:this.css.backgroundColorSombra, ease:Quart.easeIn, onComplete:function(self){
			a2.css("z-index","4");
			b1.css("z-index","2");
			b2.css("z-index","3");
			a2.children("p").text(char.toString());
			b1.children("p").text(char.toString());
			TweenMax.to(a2, self.tiempoGiro*0.5,{rotationX:0,transformStyle:"preserve-3d", ease:Quart.easeOut, backgroundColor:self.css.backgroundColor, onComplete:function(){
				b2.children("p").text(char.toString());
			}});
		},onCompleteParams:[this]});

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
	    h = this.daFormatoHora(h);
	    m = this.daFormatoHora(m);
	    s = this.daFormatoHora(s);
	    // return h+":"+m+":"+s;
	    return h.toString()+":"+m.toString()+":"+s.toString();
	    // return h.toString()+m.toString()+s.toString();
	},
	dameLaHoraFutura:function(fecha){
		// console.log(fecha);
	    var h=fecha.getHours();
	    var m=fecha.getMinutes();
	    var s=fecha.getSeconds();
	    h = this.daFormatoHora(h);
	    m = this.daFormatoHora(m);
	    s = this.daFormatoHora(s);
	    // return h+":"+m+":"+s;
	    return h.toString()+":"+m.toString()+":"+s.toString();
	    // return h.toString()+m.toString()+s.toString();
	}
};
$(document).ready(function(){
	// Si quieres crear un reloj normal pasas el div contenedor
	Reloj.creaReloj("#container");
	
	// si quieres crea una cuenta regresiva pasas el div, horas, minutos y segundos (en el ejemplo es 0 horas 1 minutos y 10 segundos a partir de ahora)
	// Reloj.creaCuentaRegresiva("#container", 0, 1, 10, function(){alert("Feliz año nuevo");}); 
	
	
});
