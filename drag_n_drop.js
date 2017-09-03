var DND = {
    intentos:0,
    maxReps:3,
    elementos:[],
    onDrag:null,
    onDrop:null,
    onReset:null,
    onGanaste:null,
    onPerdiste:null,
    onReintenta:null,
    init:function(drags, drops){
        this.drags = drags;
        this.drops = drops;
        for(var i = 0; i<this.drags.length; i++){
            var objDrag = this.drags[i];
            var c = new rootlib[objDrag.clase]();
            var drag = new createjs.Container();
            drag.x = objDrag.x;
            drag.y = objDrag.y;
            drag.origX = objDrag.x;
            drag.origY = objDrag.y;
            drag.hited = false;
            drag.id = i;
            drag.correcta = false;
            drag.addChild(c);
            stage.addChild(drag);
            var objDrop = this.drops[i];
            var b = new rootlib[objDrop.clase]();
            var drop = new createjs.Container();
            drop.x = objDrop.x;
            drop.y = objDrop.y;
            drop.origX = objDrop.x;
            drop.origY = objDrop.y;
            drop.id = i;
            drop.addChild(b);
            stage.addChild(drop);
            this.elementos.push({drag:drag, drop:drop});
        }
        this.seteaDragers();
    },
    seteaDragers:function(){
        for(var i = 0; i<this.elementos.length; i++){
            var drag = this.elementos[i].drag;
            drag.on("pressmove", function(e){
                var w = rootlib.properties.width;
                var wV = canvas.width;	
                var xR = (w * e.stageX)/wV;
                var xV = (xR * wV) / w;
                var h = rootlib.properties.height;
                var hV = canvas.height;
                var yR = (h * e.stageY)/hV;
                var yV = (yR * hV) / h;
                e.currentTarget.x = xR;
                e.currentTarget.y = yR;
                stage.update();
                var bol = DND.checkHit(e.currentTarget, true)[0];
                var drop = DND.checkHit(e.currentTarget, true)[1];
                if(DND.onDrag != null && typeof DND.onDrag === "function"){
                	DND.onDrag(this);
                }
                if(stage.getChildIndex(this) < stage.getChildIndex(drop)){
                    stage.swapChildren(this, drop);
                }
            });
            drag.on("pressup", function(e) {
                var bol = DND.checkHit(e.currentTarget, true)[0];
                var drop = DND.checkHit(e.currentTarget, true)[1];
                if (bol) {
                    this.hited = true;
                    TweenMax.to(this, 0.3,{x:drop.x, y:drop.y});
					console.log(this.id);
					console.log(drop.id);
                    if(this.id === drop.id){
                        this.correcta = true;	
                    } else {
					}
                    this.alpha = 1;
                    stage.update(e);
                    DND.revisor();
                } else {
                    this.correcta = false;
                    this.hited = false;
                    TweenMax.to(this, 0.3,{x:this.origX, y:this.origY});
                }
                if(DND.onDrop != null && typeof DND.onDrop === "function"){
                	DND.onDrop(this);
                }
            });
        }
    },
    checkHit:function(drag, bol){
        for(var j = 0; j<this.elementos.length; j++){
            var drop = this.elementos[j].drop;
            var pt = drag.localToLocal(0,0,drop);
            if (drop.hitTest(pt.x, pt.y)) {
                drag.alpha=0.2;
                if(bol){
                    return [true, drop];
                } else {
                    return true;
                }
            }else{
               drag.alpha=1;
            }
         }
        if(bol){
            return [false];
        } else {
            return false;
        }
    },
    revisor:function(){
        var buenas = 0;
        var respondidas = 0;
        for(var i = 0; i<this.elementos.length; i++){
            if(this.elementos[i].drag.hited){
                respondidas++;
            }
            if(this.elementos[i].drag.correcta){
                buenas++;
            }
        }
        if(respondidas === this.elementos.length){
            if(buenas === this.elementos.length){
               // console.log("ganaste",ELGLOBAL);
                if(DND.onGanaste != null && typeof DND.onGanaste === "function"){
                	onGanaste.onDrop(this);
                }
            } else if(this.intentos < this.maxReps-1){
                this.intentos++;
               // console.log("intentalo otra vez, te quedan ", this.maxReps-this.intentos, " intentos");
               	if(DND.onReintenta != null && typeof DND.onReintenta === "function"){
                	onReintenta.onDrop(this);
                }
            } else {
                //console.log("perdiste gusano");
				this.reset();
				if(DND.onPerdiste != null && typeof DND.onPerdiste === "function"){
                	onPerdiste.onDrop(this);
                }
            }
        }
    },
    reset:function(){		
         for(var i = 0; i<this.elementos.length; i++){
            var drag = this.elementos[i].drag;
            TweenMax.to(drag, 0.3,{x:drag.origX, y:drag.origY});
			this.buenas = 0;
			this.respondidas = 0;
			this.intentos = 0;
			drag.correcta = false;
            drag.hited = false;
            if(DND.onReset != null && typeof DND.onReset === "function"){
            	DND.onReset(drag);
            }
         }
    },
    ocultaTodo:function(){
        for(var i = 0; i<this.elementos.length; i++){
            var drag = this.elementos[i].drag;
            drag.visible = false;
            var drop = this.elementos[i].drop;
            drop.visible = false;
         }
	},
	muestraTodo:function(){
        for(var i = 0; i<this.elementos.length; i++){
            var drag = this.elementos[i].drag;
            drag.visible = true;
            var drop = this.elementos[i].drop;
            drop.visible = true;
        }	 
	}
};
var drags= [
	{x:243, y:467, clase:"mc_drag_sole"},
	{x:119, y:324, clase:"mc_drag_octa"},
	{x:109, y:458, clase:"mc_drag_palalo"},
	{x:245, y:320, clase:"mc_drag_rena"}
  ],
drops= [
	{x:365, y:272, clase:"mc_drop_zone"},
	{x:365, y:352, clase:"mc_drop_zone"},
	{x:365, y:431, clase:"mc_drop_zone"},
	{x:365, y:511, clase:"mc_drop_zone"}
],
movies = [
	{clase:"mc_bajo_sole"},
	{clase:"mc_bajo_octa"},
	{clase:"mc_bajo_palalo"},
	{clase:"mc_bajo_rena"}
]
;

(function(){
    console.log("AUTO CALL");
    DND.init(drags, drops);
    DND.maxReps = 1;
    DND.onDrag = function(drag){
        drag.dispatchEvent("DRAGGIN",true);
    };
    DND.onDrop = function(drag){
        drag.dispatchEvent("DROPON",true);
    };
    DND.onReset = function(drag){
        drag.dispatchEvent("DROPON",true);
    };
    //DND.ocultaTodo();
    stage.on("DRAGGIN",onDragging);
    stage.on("DROPON",onDropon);
    function onDragging(e){
        var mc = ELGLOBAL.slide_34;
        console.log(mc);
        mc[movies[e.target.id].clase].alpha = 0.2;
    }
    function onDropon(e){
        var mc = ELGLOBAL.slide_34;
        if(e.target.hited){
            mc[movies[e.target.id].clase].alpha = 0.2;
        } else {
            mc[movies[e.target.id].clase].alpha = 1;
        }
    }
})();
