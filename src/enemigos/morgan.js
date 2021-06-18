function loadMorgan(Q){
    
    Q.compileSheets("enemigos/morgan2.png", "enemigos/morgan.json");
    
    Q.animations("morgan_anim",{
        
        default_right: {frames: [0,1,2,3,4,5,0], rate: 1/3, loop: true, flip: false},
        default_left: {frames: [0,1,2,3,4,5,0], rate: 1/3, loop: true, flip: 'x'},

        zarpa_right: {frames: [8, 9, 10], rate: 1/6, loop: true, flip: false},
        zarpa_left: {frames: [8, 9, 10], rate: 1/6, loop: true, flip: 'x'},

        head_right: {frames: [16, 17, 18, 19, 20], rate: 1/6, loop: true, flip: false},
        head_left: {frames: [16, 17, 18, 19,20], rate: 1/6, loop: true, flip: 'x'},

        envestida_right: {frames: [24, 25, 26, 27, 28, 29], rate: 1/6, loop: true, flip: false},
        envestida_left: {frames: [24, 25, 26, 27, 28, 29], rate: 1/6, loop: true, flip: 'x'},
        
        dead_right: {frames: [32, 33, 34, 35, 36], rate: 1/4, loop: false, flip: false},
        dead_left: {frames: [32, 33, 34, 35, 36], rate: 1/4, loop: false, flip: 'x'},

        defaultSinTransformar_right: {frames: [40], rate: 1, loop: true, flip: false},
        defaultSinTransformar_left: {frames: [40], rate: 1, loop: true, flip: 'x'},
        
        transformacion_right: {frames: [40, 40, 40, 40, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], rate: 1/4, loop: false, flip: false},
        transformacion_left: {frames: [40, 40, 40, 40, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], rate: 1/4, loop: false, flip: 'x'},


    });
    
    Q.Sprite.extend("Morgan",{
        
        init: function(p) {
            this._super(p, {
                sheet: "morgan",
                sprite: "morgan_anim",
                points: [[-35,-50],[35,-50],[35,50],[-35,50]],
                speedX: 100,
                speedY: 75,
                vida: 16,
                sonidoMuerte: "voces/deadEnemyMorgan.mp3",
                puntuacion: 1000,
                transformado: false,
                offsetSuperiorVida: 55,
                ataques: [
                    
                    {
                        nombre: 'zarpa', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 2, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    },
                    {
                        nombre: 'head', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 3, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    },
                    {
                        nombre: 'envestida', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 5, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    }
                ]
            });
            this.p.facing = 'left';
            this.add("enemigo");
            this.play("defaultSinTransformar_"+this.p.facing);
        },
        step: function(dt){
            this.p.z = this.p.y + (this.p.isDead * (-20));
            
            if(this.p.isDead) return;
            
            if(!this.p.transformado) {return;}
            
            var dist = distanciaEntre(mustapha,this);
            
            //si no está atacando se intenta mover
            if(this.p.ataque==0){
                if( Math.abs(mustapha.p.y - this.p.y) < 15 && dist < 75 ) {
                    
                    if(mustapha.p.x - this.p.x > 0) this.p.facing = 'right';
                    else this.p.facing = 'left';
                    
                    this.atacar();

                } else if(dist<350) {
                    //cuando se encuentre en un rango menor a 250, se pone a perseguir al personaje
                    this.p.vx = (mustapha.p.x-this.p.x)/Math.abs(dist) * this.p.speedX;
                    this.p.vy = (mustapha.p.y-this.p.y)/Math.abs(dist) * this.p.speedY;
                } else {
                    this.p.vx = this.p.vy = 0;
                }
            } else {
                
                //si está atacando se procesa el ataque (función de la componente "enemigo")
                this.procesarAtaque(dt);
                
            }
            
            if(this.p.vx > 0) this.p.facing = "right";
            if(this.p.vx < 0) this.p.facing = "left";
            
            this.p.x += this.p.vx * dt;
            this.p.y += this.p.vy * dt;
            
            this.procesarInvulnerabilidad(dt);
            
            if( !this.animarAtaque() ) {
                /*if(this.p.vx!=0 || this.p.vy!=0) {
                    this.play("correr_"+this.p.facing);
                }
                else */
                this.play("default_"+this.p.facing);
            }
        }
        
    });
    
}