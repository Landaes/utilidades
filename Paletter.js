var Paletter = {
    count:0,
    init:function(class_name, container_id, o){
        this.comienza(class_name, container_id, o, this.count);
        this.count++;
    },
    comienza:function(class_name,container_id, o, id){

        this["paletter_"+id] = {};
        var ob = this["paletter_"+id];

        
        ob.id = id;
        ob.animando = false;
        ob.tl = null;
        ob.current = null;
        ob.slides = [];
        ob.parent = $("#"+container_id);

        o = (o !== undefined) ? o : {};
        ob.index = (o.index !== undefined) ? o.index : 0;
        ob.time = (o.time !== undefined) ? o.time : 1;
        ob.autoAnim = (o.autoAnim !== undefined) ? o.autoAnim : true;
        ob.auto_time = (o.auto_time !== undefined) ? o.auto_time : 5;
        ob.auto_dir = (o.auto_dir !== undefined) ? o.auto_dir : "l";
        ob.onStart = (o.onStart !== undefined) ? o.onStart : null; // funcion de callback
        ob.onComplete = (o.onComplete !== undefined) ? o.onComplete : null; // funcion de callback
        ob.onCompleteScope = (o.onCompleteScope !== undefined) ? o.onCompleteScope : this; // scope del callback
        ob.swipe = (o.swipe !== undefined) ? o.swipe : true; // si se usan gestos de touchscreen
        ob.puntos = (o.puntos !== undefined) ? o.puntos : true; // si además tiene puntos
        ob.bottomPosPuntos = (o.bottomPosPuntos !== undefined) ? o.bottomPosPuntos : "20px"; // si además tiene puntos
        ob.col_inactivo = (o.col_inactivo !== undefined) ? o.col_inactivo : "#ffc107"; // color inactivo puntos
        ob.col_activo = (o.col_activo !== undefined) ? o.col_activo : "#2fbd35"; // color activo puntos
        ob.colores = (o.colores !== undefined) ? o.colores : ["#0070CE","#FF70CE"]; // colores de la barra
        ob.swipeUpFn = (o.swipeUpFn !== undefined) ? o.swipeUpFn : null; // función swipeUp
        ob.swipeUpFnParams = (o.swipeUpFnParams !== undefined) ? o.swipeUpFnParams : null; // parametros función swipeUp
        ob.swipeDownFn = (o.swipeDownFn !== undefined) ? o.swipeDownFn : null; // función swipeDown
        ob.swipeDownFnParams = (o.swipeDownFnParams !== undefined) ? o.swipeDownFnParams : null; // parametros función swipeDown

        
        var th = this;
        $("#"+container_id+ " ."+class_name).each(function(i){
            th.pushDiv($(this), ob);
        });

        if(ob.puntos){
            this.creaPuntos(class_name, container_id, ob);
        }
        this.reset(ob);
        if(ob.autoAnim){
            $("#"+container_id).append("<div id='barra_slider_"+ob.id+"' class='barra_slider'></div>");
            this.mueveSlide(ob, ob.auto_dir);
        }

        if(ob.swipe){
            this.swiping(container_id,ob);
        }
    },
    pause:function(n){
        try{
           this["paletter_"+n].tl.pause();
        } catch (err){
            for (var i = 0; i < this.count; i++) {
                try{
                    this["paletter_"+i].tl.pause();
                } catch( error ){

                }
                
            }
        }
    },
    play:function(n){
        try{
            this["paletter_"+n].tl.play();
        } catch (err){

        }
    },
    pushDiv:function(div, ob){
        ob.slides.push(div);
    },
    reset:function(ob){
        ob.slides.map(function(mc){
            TweenMax.set(mc,{left:ob.parent.width()*-1, autoAlpha:0});
        });
    },
    creaPuntos:function(class_name, container_id, ob){
        var st = '<div class="cont_dots">';

        $("#"+container_id+ " ."+class_name).each(function(i){
            if(i === 0){
                st+='<div id="punto_'+ob.id+'_'+i+'" data="'+i+'" class="punto nml"></div>';
            } else {
                st+='<div id="punto_'+ob.id+'_'+i+'" data="'+i+'" class="punto"></div>';
            }
        });
        st += '</div>';
        $("#"+container_id).append(st);
        
        var w = (parseInt($("#"+container_id + " .punto").outerWidth()) + parseInt($("#"+container_id + " .punto:eq(1)").css("margin-left")) ) * $("#"+container_id+ " ."+class_name).length - parseInt($("#"+container_id + " .punto").css("margin-left"));
        
        $("#"+container_id+ " .cont_dots").css({ "width":w+"px", "margin-left":"-"+parseInt((w*0.5))+"px", "left":"50%","z-index":ob.slides.length+1,"position": "absolute", "bottom":ob.bottomPosPuntos});

        var th = this;
        $("#"+container_id + " .punto").click(function(){
            th.goto($(this).attr("data"),ob);
        });
        $("#"+container_id + " .punto").each(function(){
           TweenMax.set($(this),{backgroundColor:ob.col_inactivo,rotation:90});
        });
//        TweenMax.to($("#punto_"+ob.id+"_"+viejo),ob.time,{backgroundColor:ob.col_inactivo,rotation:90});
    },
    mueveSlide:function(ob,dir){
        var actual = ob.slides[ob.index];
        var p_a = ob.index;
        if(dir == "l"){
            if(ob.index < ob.slides.length-1){
                ob.index++;
            } else{
                ob.index = 0;
            }
        } else {
            if(ob.index === 0){
                ob.index = ob.slides.length-1;
            } else{
                ob.index--;
            }
        }
        var nuevo = ob.slides[ob.index];
        var p_b = ob.index;

        this.actualizaPuntos(p_a,p_b,ob);
        ob.current = nuevo;


        actual.css({"z-index":ob.slides.length-1});
        nuevo.css({"z-index":ob.slides.length});

        var th = this;

        if($("#cabecera").length > 0){
            $("#cabecera").css({"z-index":ob.slides.length+90});
        }
        if($("#barra_slider_"+ob.id).length > 0){
           $("#barra_slider_"+ob.id).css({"z-index":ob.slides.length+2}); 
        }
        
        actual.removeClass("current");
        nuevo.addClass("current");

        if(ob.autoAnim){
            var cols = ob.colores;

            try{ ob.tl.kill();} catch (err){ }
            
            ob.tl = new TimelineMax();
            ob.tl
            .to(("#barra_slider_"+ob.id.toString()), ob.auto_time*0.1,{width:0, backgroundColor:cols[0]});
            var w = 100/cols.length;
            for (var j = 0; j < cols.length; j++) {
                ob.tl.to(("#barra_slider_"+ob.id.toString()), (ob.auto_time/cols.length).toFixed(3),{width:w.toFixed(3)*(j+1)+"%", backgroundColor:cols[j], ease:Power0.easeNone});//cols[j];
            }
            
            ob.tl.call(this.mueveSlide, [ob,ob.auto_dir], this);
        }

        if(typeof ob.onComplete !== "function"){
            ob.onComplete = null;    
        }
         if(typeof ob.onStart !== "function"){
            ob.onStart = null;    
        }

        if(dir == "l"){
            TweenMax.set(actual,{left:0});
            TweenMax.set(nuevo,{left:ob.parent.width()*-1, autoAlpha:0});
            TweenMax.to(actual,ob.time,{left:ob.parent.width(), autoAlpha:0});           
        } else {
            TweenMax.set(actual,{left:0});
            TweenMax.set(nuevo,{left:ob.parent.width(), autoAlpha:0});
            TweenMax.to(actual,ob.time,{left:ob.parent.width()*-1, autoAlpha:0});
        }

        TweenMax.to(nuevo,ob.time,{left:0, autoAlpha:1, onStart:ob.onStart, onStartParams:[nuevo, p_a, p_b], onComplete:ob.onComplete, onCompleteParams:[nuevo, p_a, p_b], onCompleteScope:ob.onCompleteScope, ease:Back.easeOut.config(1)});
    },
    goto:function(i,ob){
        if(i != ob.index){
            var old = ob.index;
            var nuevo = parseInt(i);

            var dir = "l";
            if(old < nuevo){
                dir = "r";
            }

            var actual = ob.slides[old];
            actual.removeClass("current");
            actual.css({"z-index":0});
            TweenMax.to($("#punto_"+ob.id+"_"+old),ob.time,{backgroundColor:ob.col_inactivo});

            if(dir == "l"){
                if(i == 0){
                    ob.index = ob.slides.length-1;
                } else{
                    ob.index = parseInt(i)-1;
                }
            } else {
               if(i < ob.slides.length-1){
                    ob.index = parseInt(i)+1;
                } else{
                    ob.index = 0;
                }
            }
            
            this.mueveSlide(ob,dir);
        }
    },
    actualizaPuntos:function(viejo,nuevo,ob){
        TweenMax.to($("#punto_"+ob.id+"_"+viejo),ob.time,{backgroundColor:ob.col_inactivo,rotation:90});
        TweenMax.to($("#punto_"+ob.id+"_"+nuevo),ob.time,{backgroundColor:ob.col_activo,rotation:0});
    },
    swiping:function(container_id,ob){

        var div = document.getElementById(container_id);
        var hammer    = new Hammer.Manager(div);
        var swipe     = new Hammer.Swipe();
        var th = this;
        hammer.add(swipe);
        hammer.on('swipeleft', function(){
            th.mueveSlide(ob,"r");
        });

        hammer.on('swiperight', function(){
            th.mueveSlide(ob,"l");
        });

        if(typeof ob.swipeUpFn === "function"){
            hammer.on('swipeup', function(e){
                ob.swipeUpFn(ob.swipeUpFnParams);
            });
        }
        if(typeof ob.swipeDownFn === "function"){
            hammer.on('swipedown', function(e){
                ob.swipeDownFn(ob.swipeDownFnParams);
            });
        }
    },
    look:function(){
        Object.keys(this).forEach(function(key) {
            console.log(key, typeof this[key]);
        });
    }
};
