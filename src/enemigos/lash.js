function loadLash(Q){
    
    Q.compileSheets("enemigos/lash2.png","enemigos/lash.json");
    
    Q.animations("lash_anim",{
        
        default_right: {frames: [0,1,2,3, 4, 5, 0], rate: 1/3, loop: true, flip: false},
        default_left: {frames: [0,1,2,3, 4, 5, 0], rate: 1/3, loop: true, flip: 'x'},
        
        
        patada_right: {frames: [8, 9], rate: 1/3, loop: true, flip: false},
        patada_left: {frames: [8, 9], rate: 1/3, loop: true, flip: 'x'},

        mazo_right: {frames: [16,17,18,19], rate: 1/8, loop: true, flip: false},
        mazo_left: {frames: [16,17,18,19], rate: 1/8, loop: true, flip: 'x'},

        mazo2_right: {frames: [24,25,26,27], rate: 1/8, loop: true, flip: false},
        mazo2_left: {frames: [24,25,26,27], rate: 1/8, loop: true, flip: 'x'},

        mazoLargo_right: {frames: [32,33,34,35,36], rate: 1/8, loop: true, flip: false},
        mazoLargo_left: {frames: [32,33,34,35,36], rate: 1/8, loop: true, flip: 'x'},

        dead_right: {frames: [40, 41, 42, 43], rate: 1/4, loop: false, flip: false},
        dead_left: {frames: [40, 41, 42, 43], rate: 1/4, loop: false, flip: 'x'}
    });
    
    Q.Sprite.extend("Lash",{
        
        init: function(p) {
            this._super(p, {
                sheet: "lash",
                sprite: "lash_anim",
                points: [[-35,-50],[35,-50],[35,50],[-35,50]],
                speedX: 100,
                speedY: 75,
                sonidoMuerte: "voces/deadEnemyLash.mp3",
                vida: 7,
                puntuacion: 180,
                offsetSuperiorVida: 50,
                ataques: [
                    {
                        nombre: 'patada', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 2, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    },
                    {
                        nombre: 'mazo', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 1, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    },
                    {
                        nombre: 'mazo2', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 2, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
                        ],
                        duracion: 2/3 
                    },
                    {
                        nombre: 'mazoLargo', //mismo nombre que la animación
                        hits: [
                            {time: 2/3, extra: {damage: 5, nockback: true, offsetX: 50, offsetY: -10, w: 40, h: 30}}
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
                
                this.play("default_"+this.p.facing);
            }
        }
        
    });
    
}