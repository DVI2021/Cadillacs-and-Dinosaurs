function loadFerris(Q){
    
    Q.compileSheets("enemigos/ferris.png","enemigos/ferris.json");
    
    Q.animations("ferris_anim",{
        
        default_right: {frames: [0,1,2,1], rate: 1/3, loop: true, flip: false},
        default_left: {frames: [0,1,2,1], rate: 1/3, loop: true, flip: 'x'},
        correr_right: {frames: [8,9,10,11,12,13], rate: 1/6, loop: true, flip: false},
        correr_left: {frames: [8,9,10,11,12,13], rate: 1/6, loop: true, flip: 'x'},
        punyetazo_right: {frames: [19,20,16,17,18], rate: 1/8, loop: true, flip: false},
        punyetazo_left: {frames: [19,20,16,17,18], rate: 1/8, loop: true, flip: 'x'},
        patada_right: {frames: [21,22], rate: 1/3, loop: true, flip: false},
        patada_left: {frames: [21,22], rate: 1/3, loop: true, flip: 'x'},
        dead_right: {frames: [24, 25, 26, 27, 28], rate: 1/4, loop: false, flip: false},
        dead_left: {frames: [24, 25, 26, 27, 28], rate: 1/4, loop: false, flip: 'x'}
    });
    
    Q.Sprite.extend("Ferris",{
        
        init: function(p) {
            this._super(p, {
				sheet: "ferris",
                sprite: "ferris_anim",
                points: [[-33,-45],[33,-45],[33,45],[-33,45]],
                speedX: 100,
                speedY: 75,
                sonidoMuerte: "voces/deadEnemyFerris.mp3",
                puntuacion: 250,
                vida: 6,
                ataques: [
                    {
                        nombre: 'punyetazo', //mismo nombre que la animación
                        hits: [
                            {time: 2/8, extra: {damage: 1, nockback: false, offsetX: 35, offsetY: -22, w: 25, h: 25}},
                            {time: 5/8, extra: {damage: 2, nockback: false, offsetX: 50, offsetY: -22, w: 25, h: 25}},
                        ],
                        duracion: 5/8 
                    },
                    {
                        nombre: 'patada', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 3, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    },
                ]
			});
            this.add("enemigo");
        },
        step: function(dt){
            this.p.z = this.p.y + (this.p.isDead * (-20));
            
            if(this.p.isDead) return;
            
            var dist = distanciaEntre(mustapha,this);
            
            //si no está atacando se intenta mover
            if(this.p.ataque==0){
                if( Math.abs(mustapha.p.y - this.p.y) < 15 && dist < 75 ) {
                    
                    if(mustapha.p.x - this.p.x > 0) this.p.facing = 'right';
                    else this.p.facing = 'left';
                    
                    this.atacar();

                } else if(dist<250) {
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
                if(this.p.vx!=0 || this.p.vy!=0) {
                    this.play("correr_"+this.p.facing);
                }
                else this.play("default_"+this.p.facing);
            }
        }
        
    });
    
}