function loadEscenario1(Q){

    //
    //  NIVEL 1
    //
    
    //Escena que carga los niveles
    Q.scene("level", function(stage){
        
        Q.state.set("maxvida",30);
        Q.state.set("vida",30);
        
        fondo = new Q.ImagenDeFondo({asset: "stages/stage1_Intro_fondo.png"});
        stage.insert(fondo);
        
        Q.audio.stop("mainTittle.mp3");
        Q.audio.play("musicaFondo_2.mp3", {loop: true});

        enemigos = [
            //new Q.Ferris({x:400,y:200}),
            //new Q.Morgan({x:440,y:200}),
            //new Q.Lash({x:350,y:220})
            
            new Q.Elmer({x:800,y:250}),
            new Q.Ferris({x:400,y:150}),
            
            //new Q.Lash({x:400,y:150}),
            
        ];
        
        for(var enemigo of enemigos) stage.insert( enemigo );
       
        
        mustapha = new Q.Mustapha();
        stage.insert(mustapha);

        comidas = [
            //new Q.Langosta({x: 200, y: 200}),
            //new Q.Sushi({x: 400, y: 150}),
            new Q.Donut({x: 740, y: 166}),
            new Q.Cafe({x: 80, y: 145}),
            new Q.Chocolate({x: 635, y: 245}),
        ];
        
        for(const comida of comidas) stage.insert(comida);
        
        //viewport
        stage.add("viewport").follow(mustapha, {x:true, y:true}, {minX: 0, maxX: 1230, minY: 0, maxY: 370});
        stage.viewport.offset(0, 30);
		stage.viewport.scale = 1.2;
        
        var var_bloque_sup_der = new Q.BloqueColision({ //límite superior derecho
            points: [[770,100],[770,70],[965,187]]
        });
        var var_bloque_der = new Q.BloqueColision({ // columna full derecha
            points: [[965,270],[965,145],[980,145],[980,270]]
        });
        var var_bloque_inf_alt = new Q.BloqueColision({ //fila full abajo
            points: [[870,270],[965,270],[965,280],[870,280]]
        });
        
        bloquesColision = {
            globales: [
                new Q.BloqueColision({
                    points: [[0,150],[150,220],[0,Q.height]]
                }),
                new Q.BloqueColision({
                    points: [[150,220],[520,220],[620,270]]
                }),
                new Q.BloqueColision({
                    points: [[0,80],[0,-1000],[760,-1000],[760,80]]
                }),
                new Q.BloqueColision({ //fila full abajo
                    points: [[620,270],[865,270],[865,280],[620,280]]
                }),
                new Q.BloqueColision({ //columna full derecha
                    points: [[0,70],[0,150],[-40,110]]
                }),
                var_bloque_inf_alt,
                var_bloque_sup_der,
                var_bloque_der
                
            ],
            quitar: [
                var_bloque_sup_der,
                var_bloque_der,
                var_bloque_inf_alt
            ],
            poner: [
                new Q.BloqueColision({ //límite superior derecho trimeado para pasar por la puerta
                    //points: [[770,100],[770,70],[965,187]],
                    points: [[770,100],[770,70],[1200,145],[880,145]]
                }),
                new Q.BloqueColision({ // "rampa" hacia la puerta
                    points: [[870,270],[935,240],[1200,240]]
                })
            ]
        };
        for(var i=0;i<bloquesColision.globales.length;++i)
            stage.insert(bloquesColision.globales[i]);

        bloqueColisionPuerta = new Q.BloqueColisionPuerta();
        stage.insert( bloqueColisionPuerta );
        
        bloqueCambioNivel1a2 = new Q.BloqueCambioNivel1a2();
        stage.insert( bloqueCambioNivel1a2 );
        
    });
    
    //para detectar cuando se rompe la puerta
    Q.Sprite.extend("BloqueColisionPuerta",{
        
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
            this.p.points = [[900,175],[900,225],[925,225],[925,175]];
            this.add("2d");
        },
        step: function(dt) {
            var collided = false;
            if((collided = this.stage.search(this)) && collided.obj instanceof Q.Ataque && collided.obj.p.faccion == 1) {
                
                //console.log(collided);
                this.stage.insert( new Q.ImagenDeFondo({asset: "stages/stage1_Intro_puerta-fondo.png"}) );
                this.stage.insert( new Q.ImagenDeFondo({asset: "stages/stage1_Intro_puerta-fondo-over.png", z: 1000000}) );
               
                for(var i=0;i<bloquesColision.quitar.length;++i)
                    this.stage.remove(bloquesColision.quitar[i]);
                
                for(var i=0;i<bloquesColision.poner.length;++i)
                    this.stage.insert(bloquesColision.poner[i]);
                
                Q.audio.play("efectos/romperPuertaLoud.mp3");
                
                this.destroy();
            }
            
        }
        
    });
    
    //para detectar el cambio de nivel
    Q.Sprite.extend("BloqueCambioNivel1a2",{
        
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
            this.p.points = [[1150,150],[1200,150],[1200,230],[1150,230]];
            this.add("2d");
        },
        step: function(dt) {
            var collided = false;
            if((collided = this.stage.search(this)) && collided.obj instanceof Q.Mustapha) {
                
                //opraciones para cambiar de nivel
                //console.log("cambio de nivel 1 a 2")
                Q.clearStages();
                //Q.stageScene("pantallaVictoria",1)
                
                Q.audio.stop("musicaFondo_2.mp3");
                Q.stageScene("background2", 1);
                Q.stageScene("level2", 2);
                Q.stageScene("hud", 3);
                /**/
                this.destroy();
            }
            
        }
        
    });


}