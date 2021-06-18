function loadMustapha(Q) {
    
    Q.compileSheets("mustapha.png","mustapha.json");
    
    Q.animations("mustapha_anim",{
        
        default_left: {frames: [0,0,0,33,34,35,36,37], rate: 1/6, loop: true, flip: 'x'},
        default_right: {frames: [0,0,0,33,34,35,36,37], rate: 1/6, loop: true, flip: false},
        walk_left: {frames:[1,2,3,4,5,6,7,8,9,10,11], rate: 1/12, loop: true, flip: 'x'},
        walk_right: {frames:[1,2,3,4,5,6,7,8,9,10,11], rate: 1/12, loop: true, flip: false},
        punch_left: {frames:[12,13], rate: 1/3, loop: true, flip: 'x'},
        punch_right: {frames:[12,13], rate: 1/3, loop: true, flip: false},
        kick_left: {frames:[14,15,16,17,18,19,20,21,22], rate: 1/7, loop: false, flip: 'x'},
        kick_right: {frames:[14,15,16,17,18,19,20,21,22], rate: 1/7, loop: false, flip: false},
        damaged_left: {frames:[23,24,25,26,27,28,29,30,31,32], rate: 1/5, loop: false, flip: 'x'},
        damaged_right: {frames:[23,24,25,26,27,28,29,30,31,32], rate: 1/5, loop: false, flip: false},
        catch_left: {frames:[38,39], rate: 1/3, loop: false, flip: 'x'},
        catch_right: {frames:[38,39], rate: 1/3, loop: false, flip: false},
        fall_left: {frames:[23,24,25,26,27], rate: 1/4, loop: false, flip: 'x'},
        fall_right: {frames:[23,24,25,26,27], rate: 1/4, loop: false, flip: false}
    });
    
    Q.Sprite.extend("Mustapha", {
        init:  function(p) {
            this._super(p, {
				sheet: "mustapha",
				//asset: "mustapha.png",
                sprite: "mustapha_anim", // Animaciones de Mario
				x: 150,
				y: 150,
				frame: 0,
				isDead: false,
				deltaDead: 0,
				scale: 1,
                vx: 0,
                vy: 0,
                points: [[-23,-41],[-23,41],[23,41],[23,-41]],
                speedX: 120,
                speedY: 100,
                gravity: 0,
                sensor: true,
                facing: "right",
                ignorarColision: false,
                bloquearMovimiento: false,
                duracionInvulnerabilidad: 0.5,
                tiempoInvulnerable: 0,
                duracionComer: 2/3,
                tiempoComer: 0,
                ataque: 0,
                ataques: [
                    {
                        nombre: 'punch', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 1, nockback: false, offsetX: 35, offsetY: -22, w: 25, h: 25}},
                        ],
                        duracion: 2/3 
                    },
                    {
                        nombre: 'kick', //mismo nombre que la animación
                        hits: [
                            {time: 1, extra: {damage: 3, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 9/7
                    },
                ],
                ataque: 0,
                deltaAtaque: 0,
                faseDeAtaque: 0,
                faccion: 1
			});
            this.add("tween, animation, 2d");
            this.play("default_"+this.p.facing);
        },
        step: function(dt) {
            
            this.p.z = this.p.y;
            
            if(this.p.isDead){
                this.p.deltaDead += dt;
                if(this.p.deltaDead >= 2){
                    this.destroy();
                    Q.clearStages();
                    Q.audio.stop();
                    Q.stageScene("finJuego",1);
                }
                return;
            }
            if(this.p.bloquearMovimiento) {
                this.play("default_"+this.p.facing);
                this.p.vx = this.p.vy = 0;
                return;
            }

            if(Q.state.get("vida") <= 0){
                Q.audio.play("voces/deadMustapha.mp3");
                //ANIMACION DE MUERTE
                this.p.isDead = true;
                this.play("fall_"+this.p.facing);
                this.p.vx = this.p.vy = 0;
            }
            else{
                
                if( this.p.ataque==0 ) {
                    if(this.p.tiempoComer > 0){
                        this.p.tiempoComer -= dt;

                        if(this.p.tiempoComer < 0){
                            this.p.tiempoComer = 0;
                        }
                    }
                    else{


                        if( Q.inputs["disparar"] ) this.escogerAtaque(1);
                        else if( Q.inputs["saltar"] ) this.escogerAtaque(2);
                        else {

                            this.p.vx = (
                                (Q.inputs["right"]?1:0)
                                    -
                                (Q.inputs["left"]?1:0)
                            ) * this.p.speedX;

                            this.p.vy = (
                                (Q.inputs["down"]?1:0)
                                    -
                                (Q.inputs["up"]?1:0)
                            ) * this.p.speedY;
                        }

                    }
                
                } else {

                    this.procesarAtaque(dt);

                }
                    
                this.p.x += this.p.vx * dt;
                this.p.y += this.p.vy * dt;
                
                // Gestionar temporizador de invulnerabilidad
                this.p.tiempoInvulnerable = Math.max(
                    this.p.tiempoInvulnerable -= dt,
                    0
                );
                
                if(this.p.tiempoInvulnerable>0) this.p.opacity = 0.6;
                else this.p.opacity = 1;
                
                //Animar dependiendo de el estado actual del jugador
                
                //La idea es que si vx es 0 no cambie de dirección en la que mira
                if(this.p.vx > 0) this.p.facing = "right";
                if(this.p.vx < 0) this.p.facing = "left";
                
                if( this.animarAtaque() ) return;
                if(this.p.tiempoComer > 0){
                    this.play("catch_" + this.p.facing);
                }
                else if(this.p.vx!=0 || this.p.vy!=0) {
                    this.play("walk_"+this.p.facing);
                }
                else this.play("default_"+this.p.facing);

            }
            
        },
        
        escogerAtaque: function( id ) {
            this.p.vx = this.p.vy = 0;
            this.p.ataque = id;
            this.p.deltaAtaque = 0;
            this.p.faseDeAtaque = 0;
        },
        
        procesarAtaque: function(dt) {
            //condiciones de acabado
            if(this.p.ataque<=0 || this.p.ataque>this.p.ataques.length || (
                    this.p.faseDeAtaque>=this.p.ataques[this.p.ataque-1].hits.length
                    &&
                    this.p.deltaAtaque >= this.p.ataques[this.p.ataque-1].duracion
                )
            ) {
                this.p.ataque = 0;
                return;
            }
            
            this.p.deltaAtaque+=dt;
            
            if(this.p.faseDeAtaque >= this.p.ataques[this.p.ataque-1].hits.length) return;
            
            if(this.p.deltaAtaque >= this.p.ataques[this.p.ataque-1].hits[this.p.faseDeAtaque].time) {
                
                //TODO: atacar con los datos correctos:
                //console.log(this.p.faseDeAtaque);
                //console.log(this.p.ataques[this.p.ataque-1].hits[this.p.faseDeAtaque]);
                
                var propAtaque = this.p.ataques[this.p.ataque-1].hits[this.p.faseDeAtaque].extra;
                
                propAtaque.x = this.p.x + (this.p.facing=="left"? -1 : 1 )*(propAtaque.offsetX?propAtaque.offsetX:0);
                propAtaque.y = this.p.y + (propAtaque.offsetY?propAtaque.offsetY:0);
                if(!propAtaque.h) propAtaque.h = 100;
                if(!propAtaque.w) propAtaque.w = 100;
                
                propAtaque.faccion = this.p.faccion;
                
                Q.stages[2].insert( new Q.Ataque( propAtaque ) );
                Q.audio.play("efectos/punioSinColision.mp3");
                //console.log("ataque "+this.p.ataque+", fase "+this.p.faseDeAtaque);
                
                this.p.faseDeAtaque++ ;
                
            }
            
            
        },
        
        animarAtaque: function(){
            
            //si no se puede animar se devuelve false
            if(this.p.ataque==0 || this.p.ataque>this.p.ataques.length) return false;
            
            //si se va a poder animar, se anima, y se devuelve true
            this.play(this.p.ataques[this.p.ataque-1].nombre+"_"+this.p.facing);
            
            return true;
            
		},

        comer: function(puntosVida) {
            if(this.p.isDead) return;
            if(this.p.tiempoComer>0) return false;
            if(this.p.ataque!=0) return false;
            if(!Q.inputs["agacharse"]) return false;

            PUNTOS_GLOBALES += puntosVida * 10;
            
            if( Q.state.get("vida") + puntosVida > Q.state.get("maxvida")){
                Q.state.set("vida", 30);
            }
            else{
                Q.state.inc("vida", puntosVida);
            }
            this.p.vx = this.p.vy = 0;
            this.p.tiempoComer = this.p.duracionComer;

            return true;  
        },

        damage: function( damage, nockback, faccion ) {
            if(this.p.isDead) return;
            if(faccion==this.p.faccion) return;
            if(this.p.tiempoInvulnerable>0) return;
            
            Q.state.dec("vida", damage);
            PUNTOS_GLOBALES -= damage * 10;
            this.p.tiempoInvulnerable = this.p.duracionInvulnerabilidad;  
        }
        
    });
    
}