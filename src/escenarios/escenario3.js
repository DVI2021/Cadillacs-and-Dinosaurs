function loadEscenario3(Q){

    //
    //  NIVEL 3
    //
    
    Q.scene("background3", function(stage){

        imDeFondo = new Q.ImagenDeFondo(
            {
                asset: "stages/stage2_background2.png",
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
    
    Q.scene("level3", function(stage){

        Q.state.set("maxvida",30);
        Q.state.set("vida",30);

        fondo = new Q.ImagenDeFondo({asset: "stages/jungle.png"});
        stage.insert(fondo);

        //Q.audio.stop("mainTittle.mp3");
        Q.audio.stop("musicaFondo_3.mp3");
        Q.audio.play("musicaFondo_4.mp3", {loop: true});

        //CARGA ENEMIGOS
        morgan = new Q.Morgan({x:3425,y:420});
        enemigos = [
            morgan,
            new Q.Lash({x:2800,y:185}),
            new Q.Elmer({x:2410,y:185}),
            new Q.Lash({x:2200,y:185}),
            new Q.Ferris({x:1730,y:160}),
            new Q.Lash({x:1111,y:170}),
            new Q.Elmer({x:730,y:200}),
        ];

        for(var enemigo of enemigos) stage.insert( enemigo );

        mustapha = new Q.Mustapha({x: 30}); //antes 2600
        stage.insert(mustapha);

        //CARGA COMIDA
        comidas = [
            new Q.Ensalada({x: 2990, y: 337}),
            new Q.Ensalada({x: 2890, y: 337}),
            new Q.Sushi({x: 2650, y: 220}),
            //new Q.Langosta({x: 2500, y: 150}),
            new Q.Langosta({x: 2160, y: 150}),
            new Q.Sushi({x: 1830, y: 220}),
            new Q.Ensalada({x: 1444, y: 160}),
            new Q.Langosta({x: 1024, y: 220}),
            new Q.Sushi({x: 400, y: 220}),
            new Q.Cafe({x: 20, y: 160}),
            new Q.Tarta({x: 3295, y: 410}),
        ];
        
        for(const comida of comidas) stage.insert(comida);

        //viewport
        stage.add("viewport").follow(mustapha, {x:true, y:true}, {minX: 0, maxX: 4350, minY: 0, maxY: 640});
        stage.viewport.offset(0, 30);
        stage.viewport.scale = 1.2;

        var bloqueColisionIzqBoss = new Q.BloqueColision({points: [[3100,380],[3100,500],[3110,500],[3110,380],]});
        var bloqueColisionDerBoss = new Q.BloqueColision({points: [[3510,380],[3510,500],[3520,500],[3520,380],]});
        
        bloquesColision = {
            global: [
                new Q.BloqueColision({ //pies
                    points: [[0,240],[2730,240],[3020,528]]
                }),
                new Q.BloqueColision({ //cabeza
                    points: [[0,80],[0,-1000],[3000,-1000],[3000,80]]
                }),
                new Q.BloqueColision({ // pared fondo
                    points: [[3030,530],[3646,530],[3030,550],[3646,550]]
                }),
                new Q.BloqueColision({
                    points: [[3115,85],[2875,85],[3115,325],[3646,325]]
                }),
                new Q.BloqueColision({
                    points: [[0,90],[0,250],[-40,110]]
                })

            ],
            addPreBossFight: [
                bloqueColisionIzqBoss,
                bloqueColisionDerBoss
            ],
            removePreBossFight: [
                
            ],
            addPostBossFight: [
                
            ],
            removePostBossFight: [
                bloqueColisionIzqBoss,
                bloqueColisionDerBoss
            ]
        };
        
        for(const bloqueColision of bloquesColision.global) stage.insert(bloqueColision);
        
        stage.insert( new Q.BloqueInicioBossFight() );
        
        bloqueCambioNivel3aVictoria = new Q.BloqueCambioNivel3aVictoria();
        stage.insert( bloqueCambioNivel3aVictoria );

    });
    
    Q.Sprite.extend("BloqueInicioBossFight",{
        
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
            this.p.points = [[3200,350],[3200,500],[3210,500],[3210,350]];
            this.add("2d");
        },
        step: function(dt) {
            var collided = false;
            if((collided = this.stage.search(this)) && collided.obj instanceof Q.Mustapha) {
                
                //actualizar bordes
                for(const bloqueColision of bloquesColision.addPreBossFight) this.stage.insert(bloqueColision);
                for(const bloqueColision of bloquesColision.removePreBossFight) this.stage.remove(bloqueColision);
                
                //viewport
                this.stage.unfollow();
                this.stage.moveTo(3100,260);
                
                //bloquear movimiento Mustapha
                mustapha.p.bloquearMovimiento = true;
                
                //animar a morgan
                morgan.play("transformacion_"+morgan.p.facing);
                
                //rugido de morgan
                Q.audio.stop();
                window.setTimeout(function(){Q.audio.play("voces/rugidoBoss.mp3");},750);
                
                //empezar la bossfight con retardo (4seg);
                window.setTimeout(funcionEmpezarBossFight,4000);
                
                //eliminar trigger
                this.destroy();
            }
            
        }
        
    });
    
    funcionEmpezarBossFight = function() {
        //desbloquear movimiento de ambos
        morgan.p.transformado = true;
        mustapha.p.bloquearMovimiento = false;
        
        //musica de fondo
        Q.audio.play("bossSong.mp3");
        
        //añadir detección de fin de pelea
        mustapha.stage.insert(new Q.DetectarFinDeBossFight());
    }
    
    //Detección de fin de pelea
    Q.Sprite.extend("DetectarFinDeBossFight",{
        
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
            this.p.points = [[-1000,-1000],[-1001,-1000],[-1000,-1001]];
            this.add("2d");
        },
        step: function(dt) {
            
            if(morgan.p.isDead) {
                //actualizar bordes del mapa
                for(const bloqueColision of bloquesColision.addPostBossFight) this.stage.insert(bloqueColision);
                for(const bloqueColision of bloquesColision.removePostBossFight) this.stage.remove(bloqueColision);
                //cambiar viewport
                this.stage.add("viewport").follow(mustapha, {x:true, y:true}, {minX: 0, maxX: 4350, minY: 0, maxY: 640});
                //actualizar trigger
                this.destroy();
            }
            
        }
        
    });
    
    //Bloque final para completar el juego
    Q.Sprite.extend("BloqueCambioNivel3aVictoria",{
        
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
            this.p.points = [[3660,415],[3687,415],[3687,514],[3660,514]];
            this.add("2d");
        },
        step: function(dt) {
            var collided = false;
            if((collided = this.stage.search(this)) && collided.obj instanceof Q.Mustapha) {
                
                //opraciones para cambiar de nivel
                //console.log("cambio de nivel 1 a 2")
                Q.clearStages();
                //Q.stageScene("pantallaVictoria",1)
                
                Q.audio.stop();
                Q.stageScene("pantallaVictoria", 1);
                /**/
                this.destroy();
            }
            
        }
        
    });

}