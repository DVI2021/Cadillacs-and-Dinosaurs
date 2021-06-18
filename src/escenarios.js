
function loadEscenarios(Q){
    
    //VIDA PROTAGONISTA
    Q.Sprite.extend("BarraVida",{
        init: function(p) {
            
            this._super(p,{
                
                x: 50,
                y: 32,
                w: 150,
                h: 15,
                cx: 0,
                cy: 0,
                color_borde: "white",
                color_vida: "yellow",
                color_danyo: "red",
                tam_borde: 2
            });
            
        },
        draw: function(ctx) {
            
            ctx.fillStyle = this.p.color_borde;
            ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
            
            ctx.fillStyle = this.p.color_danyo;
            ctx.fillRect(-this.p.cx+this.p.tam_borde, -this.p.cy+this.p.tam_borde, this.p.w-(this.p.tam_borde*2), this.p.h-(this.p.tam_borde*2));
            
            ctx.fillStyle = this.p.color_vida;
            var pxVida = (Q.state.get("vida") * this.p.w ) / Q.state.get("maxvida");
            ctx.fillRect(-this.p.cx+this.p.tam_borde, -this.p.cy+this.p.tam_borde, (pxVida-(this.p.tam_borde*2)<0?0:(pxVida-(this.p.tam_borde*2)>this.p.w-(this.p.tam_borde*2)?this.p.w-(this.p.tam_borde*2): pxVida-(this.p.tam_borde*2))), this.p.h-(this.p.tam_borde*2));
            
        }
    });
    
    //Pantalla de inicio
    Q.scene("mainTitle", function(stage){
        
        PUNTOS_GLOBALES = 0;
        
        var button = new Q.UI.Button({
            x: Q.width/2,
            y: Q.height/2,
            color: 'white',
            font: "Arial",
            size: 15,
            asset: "stages/mainTittle_Cadillacs.png"
        });

        Q.audio.play("mainTittle.mp3");
        button.on("click", function(){
            mapa = 0;
            
            Q.clearStages();
            Q.audio.stop();
            
            
            Q.stageScene("background", 1);
            Q.stageScene("level", 2);
            Q.stageScene("hud", 3);/**/

            //PRUEBAS (descomentar para que te lance a un nivel en concreto)
            /*
            Q.stageScene("background2", 1);
            Q.stageScene("level2", 2);
            Q.stageScene("hud", 3);/**/
            
            /*
            Q.stageScene("background3", 1);
            Q.stageScene("level3", 2);
            Q.stageScene("hud", 3);
            mustapha.p.x = 3011;
            mustapha.p.y = 408;/**/
            
            /*Q.stageScene("pantallaVictoria", 1);/**/
            
        });
        stage.insert(button);
    });

    Q.scene("background", function(stage){

        imDeFondo = new Q.ImagenDeFondo(
            {
                asset: "stages/stage1_background1.png",
                x: -200
            });
        //TODO: ver porque esto no funciona
        //imDeFondo.p.scale = 1.00000000000;
        imDeFondo.step = function() {
            //this.p.x = -200-mustapha.p.x / 10;
        }
        stage.insert(imDeFondo);

    });
    
    //Interfaz de usuario // HUD
    Q.scene("hud", function(stage){
        
        icono_personaje = new Q.Sprite({
            sheet: 'retrato_mustapha',
            x: 0,
            y: 0,
            cx: 0,
            cy: 0,
            scale: 2
        });
        
        stage.insert(icono_personaje);
        
        barraVida = new Q.BarraVida();
        stage.insert(barraVida);
        
        nombre_personaje = new Q.UI.Text( {
            x: 50,
            y: 0,
            label: "Mustapha",
            color: 'white',
            font: "Arial",
            size: 15,
            align: 'left',
            angle: 0,
            opacity: 1
        });
        stage.insert(nombre_personaje);
        
        puntos_personaje = new Q.UI.Text( {
            x: 50,
            y: 15,
            label: "Puntuación: ",
            color: 'white',
            font: "Arial",
            size: 15,
            align: 'left',
            angle: 0,
            opacity: 1
        });
        
        puntos_personaje.step = function(dt) {
            this.p.label = "Puntuación: "+PUNTOS_GLOBALES;
        }
        
        stage.insert(puntos_personaje);
        
    });
    
    //ESCERNARIOS
    loadEscenario1(Q);
    loadEscenario2(Q);
    loadEscenario3(Q);
    
    //
    //  PANTALLA DE FIN
    //
    
    Q.scene("finJuego", function(stage){
        var button = new Q.UI.Button({
            x: Q.width/2,
            y: Q.height/2,
            color: 'white',
            font: "Arial",
            size: 15,
            asset: "stages/gameOver-500x330.png"
        });

        Q.audio.play("gameOver.mp3");
        button.on("click", function(){
            mapa = 0;
            Q.clearStages();
            Q.audio.stop();
            Q.stageScene("mainTitle",1);
        });
        stage.insert(button);
    });
    
    //
    //  PANTALLA VICTORIA
    //
    
    Q.UI.Text.extend("TextoCreditos",{
        init: function(p) {
            
            this._super(p,{
                vy: -20,
                x: Q.width*3/4,
            });
            if(!this.p.color) this.p.color = "white";
            if(!this.p.label) this.p.label = "";
            if(!this.p.font) this.p.font = "Arial";
            if(!this.p.size) this.p.size = 10;
        },
        step: function(dt) {
            this.p.y += this.p.vy * dt;
        }
    });
    
    Q.scene("pantallaVictoria", function(stage){
        //Fondo y botón
        button = new Q.UI.Button({
            x: Q.width/2,
            y: Q.height/2,
            color: 'white',
            asset: "stages/fondo-victoria500x330.png"
        });
        button.on("click", function(){
            Q.clearStages();
            Q.audio.stop();
            Q.stageScene("mainTitle",1);
        });
        stage.insert(button);
        
        //Retrato
        Q.animations("mustapha-retrato_anim",{
            anim_bucle: {frames:[0,0,0,1,2,1], loop: true, rate: 1/4}
        });
        var retrato = new Q.Sprite({
            sheet: "mustapha-retrato",
            sprite: "mustapha-retrato_anim",
            x: Q.width/4,
            y: Q.height/2 - 60
        });
        retrato.add("animation");
        retrato.play("anim_bucle");
        stage.insert(retrato);
        
        //Puntuación
        var ptos = new Q.UI.Text({
            x: Q.width/4,
            y: Q.height/2 + 40 - 60,
            label: "Puntuación: "+PUNTOS_GLOBALES,
            color: 'white',
            font: "Arial",
            size: 15,
            align: 'center',
            angle: 0,
            opacity: 1
        });
        stage.insert(ptos);
        
        //Label victoria
        var ptos = new Q.UI.Text({
            x: Q.width/4,
            y: 15,
            label: "¡VICTORIA!",
            color: 'white',
            font: "Arial",
            size: 25,
            align: 'center',
            angle: 0,
            opacity: 1
        });
        stage.insert(ptos);
        
        //Busto
        var busto = new Q.Sprite({
            asset: "mustapha-busto.png",
            x: Q.width/4,
            y: Q.height
        });
        busto.p.y -= busto.p.h/2;
        stage.insert(busto);
        
        Q.audio.stop();
        Q.audio.play("victoryEnding.mp3");
        
        for(var i=0;i<creditos.length;++i) {
            var propTexto = creditos[i];
            propTexto.y = Q.height/**/ + i*30;
            stage.insert(new Q.TextoCreditos(propTexto));
        }
        stage.insert(new Q.TextoCreditos({y:200}));
        
    });
}
