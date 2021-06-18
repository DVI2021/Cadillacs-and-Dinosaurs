function loadEscenario2(Q){

    //
    // NIVEL 2
    //
    
    Q.scene("background2", function(stage){

        imDeFondo = new Q.ImagenDeFondo(
            {
                asset: "stages/background3.png",
                //x: -200
            });
        //TODO: ver porque esto no funciona
        //imDeFondo.p.scale = 1.00000000000;
        imDeFondo.step = function() {
            //intentar no tocar xd
            this.p.x = Math.min(-100,-30-mustapha.p.x / 3);
        }
        stage.insert(imDeFondo);

    });
    
    Q.scene("level2", function(stage){

        Q.state.set("maxvida",30);
        Q.state.set("vida",30);

        fondo = new Q.ImagenDeFondo({asset: "stages/rocas.png"});
        stage.insert(fondo);

        //Q.audio.stop("mainTittle.mp3");
        Q.audio.stop("musicaFondo_2.mp3");
        Q.audio.play("musicaFondo_3.mp3", {loop: true});

        //CARGA ENEMIGOS
        enemigos = [
            new Q.Ferris({x:300,y:200}),
            new Q.Ferris({x:3580,y:200}),
            //new Q.Ferris({x:300,y:200}),
            new Q.Elmer({x:650,y:150}),
            new Q.Elmer({x:2160,y:150}),
            new Q.Lash({x:1150,y:190}),
            new Q.Lash({x:3000,y:250}),
            /*new Q.Ferris({x:150,y:125}),
            
            new Q.Morgan({x:940,y:200}),
            new Q.Lash({x:1450,y:125}),
            
            new Q.Ferris({x:1750,y:145}),
            new Q.Lash({x:2000,y:200}),
            new Q.Elmer({x:2300,y:240}),*/
        ];

        
        
        for(var enemigo of enemigos) stage.insert( enemigo );

        //CARGA COMIDA
        comidas = [
            //new Q.Chocolate({x: 250, y: 200}),
            //new Q.Cafe({x: 500, y: 550}),
            //new Q.Donut({x: 750, y: 135}),
            new Q.Helado({x: 1735, y: 140}),
            new Q.Pizza({x: 920, y: 260}),
            new Q.Hamburguesa({x: 3240, y: 180}),
            new Q.Patatas({x: 3425, y: 245}),
            new Q.Perrito({x: 2575, y: 233}),
            new Q.Croissant({x: 1430, y: 140}),
        ];
        
        for(const comida of comidas) stage.insert(comida);
        


        mustapha = new Q.Mustapha({x: 30}); //antes 2600
        stage.insert(mustapha);

        

        //viewport
        stage.add("viewport").follow(mustapha, {x:true, y:true}, {minX: 0, maxX: 4350, minY: 0, maxY: 290});
        stage.viewport.offset(0, 30);
        stage.viewport.scale = 1.2;

        bloquesColision = [
            new Q.BloqueColision({ //pies
                points: [[0,270],[2730,300],[3700,270]]
            }),
            new Q.BloqueColision({ //cabeza
                points: [[0,60],[0,-1000],[3700,-1000],[3700,60]]
            }),
            new Q.BloqueColision({ //piedra en camino
                points: [[1457,62],[1487,90],[1689,90],[1724,62]]
            }),
            new Q.BloqueColision({ //piedra 2 en camino
                points: [[2762,62],[2792,90],[3700,90],[3700,62]]
            }),
            new Q.BloqueColision({ //piedra 2 en camino
                points: [[3096,205],[3096,252],[3380,252],[3380,205]]
            }),
            new Q.BloqueColision({
                points: [[0,90],[0,250],[-40,110]]
            })

        ];
        for(var i=0;i<bloquesColision.length;++i)
            stage.insert(bloquesColision[i]);

        bloqueCambioNivel2a3 = new Q.BloqueCambioNivel2a3();
        stage.insert( bloqueCambioNivel2a3 );

    });

    Q.Sprite.extend("BloqueCambioNivel2a3",{
        
        init:  function(p) {
            this._super(p, {
                x: 0,
                y: 0,
                h: 9000,
                w: 9000,
                cx: 0,
                cy: 0,
                ignorarColision: true,
                sensor: true,
                gravity: 0
            });
            this.p.points = [[3637,100],[3687,100],[3687,200],[3637,200]];
            this.add("2d");
        },
        step: function(dt) {
            var collided = false;
            if((collided = this.stage.search(this)) && collided.obj instanceof Q.Mustapha) {
                
                //opraciones para cambiar de nivel
                //console.log("cambio de nivel 1 a 2")
                Q.clearStages();
                //Q.stageScene("pantallaVictoria",1)
                
                Q.audio.stop("musicaFondo_3.mp3");
                Q.stageScene("background3", 1);
                Q.stageScene("level3", 2);
                Q.stageScene("hud", 3);
                /**/
                this.destroy();
            }
            
        }
        
    });

}


