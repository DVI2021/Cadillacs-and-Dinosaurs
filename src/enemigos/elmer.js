function loadElmer(Q){

    Q.compileSheets("enemigos/elmer.png", "enemigos/elmer.json");


    Q.animations("elmer_anim",{
        fumandoEspero_right: {frames: [0, 1, 2 ,3, 4 , 5, 6, 7, 8], rate:1.5/2, loop: true, flip: false},
        fumandoEspero_left: {frames: [0, 1, 2 ,3, 4 , 5, 6, 7, 8], rate:1.5/2, loop: true, flip: 'x'},

        default_right: {frames: [10,11,12,13, 14, 10], rate: 1/9, loop: true, flip: false},
        default_left: {frames: [10,11,12,13, 14, 10], rate: 1/9, loop: true, flip: 'x'},
        //Ataque especial, debe desplazarse
        atackTank_right: {frames: [16,17,18,19, 20, 21, 22,23, 24], rate: 1/8, loop: true, flip: false},
        atackTank_left: {frames: [16,17,18,19, 20, 21, 22,23, 24], rate: 1/8, loop: true, flip: 'x'},
        //Ataques con misma sincronia!
        comboAtack_right: {frames: [26, 27, 28, 29, 30, 31], rate: 1/5, loop: true, flip: false},
        comboAtack_left: {frames: [26, 27, 28, 29, 30, 31], rate: 1/5, loop: true, flip: 'x'},
        punyetazo_right: {frames: [26, 27, 28], rate: 1/5, loop: true, flip: false},
        punyetazo_left: {frames: [26, 27, 28], rate: 1/5, loop: true, flip: 'x'},
        patada_right: {frames: [29, 30, 31, 31], rate: 1/5, loop: true, flip: false},
        patada_left: {frames: [29, 30, 31, 31], rate: 1/5, loop: true, flip: 'x'},
        dead_right: {frames: [32, 33, 34, 35, 36], rate: 1/4, loop: false, flip: false},
        dead_left: {frames: [32, 33, 34, 35, 36], rate: 1/4, loop: false, flip: 'x'}
        
    });

    Q.Sprite.extend("Elmer",{
        init: function(p) {
            this._super(p, {
				sheet: "elmer",
                sprite: "elmer_anim", // Animaciones
                points: [[-33,-45],[33,-45],[33,45],[-33,45]],
                speedX: 80,
                speedY: 65,
                sonidoMuerte: "voces/deadEnemyElmer.mp3",
                vida: 8,
                puntuacion: 350,
                ataques: [
                    //Cuando hace atackTank, debe de desplazarse, quizas desde cierta distancia?!!!
                    {
                        nombre: 'atackTank',
                        hits:  [
                            {time: 3/5, extra: {damage: 4, nockback: false, offsetX: 50, offsetY: 0, w: 25, h: 100}},
                        ],
                        duracion: 3/5
                    },
                    {
                        nombre: 'comboAtack',
                        hits:  [
                            {time: 2/5, extra: {damage: 2, nockback: false, offsetX: 50, offsetY: 0, w: 25, h: 25}},
                        ],
                        duracion: 3/5
                    },
                    {
                        nombre: 'punyetazo',
                        hits:  [
                            {time: 2/5, extra: {damage: 1, nockback: false, offsetX: 50, offsetY: 0, w: 25, h: 25}},
                        ],
                        duracion: 3/5
                    },
                    {
                        nombre: 'patada',
                        hits:  [
                            {time: 2/5, extra: {damage: 4, nockback: true, offsetX: 50, offsetY: -10, w: 30, h: 30}},
                        ],
                        duracion: 3/5
                    }
                    
                    
                ]
			});
            this.add("enemigo");
            //this.play("punyetazo_"+this.p.facing);
        },
        step: function(dt){
            this.p.z = this.p.y + (this.p.isDead * (-10)) ;
            
            if(this.p.isDead) return;
            
            var dist = distanciaEntre(mustapha, this);
            
            //si no está atacando se intenta mover
            if(this.p.ataque==0){
                if( Math.abs(mustapha.p.y - this.p.y) < 10 && dist < 70 ) {
                    
                    if(mustapha.p.x - this.p.x > 0) this.p.facing = 'right';
                    else this.p.facing = 'left';
                    
                    //this.p.ataque = 4;
                    //this.p.deltaAtaque = 0;
                    //this.p.faseDeAtaque = 0;
                    //this.p.vx = this.p.vy = 0;
                    this.atacar();

                }  
                else if(dist<250) {
                    this.p.vx = (mustapha.p.x-this.p.x)/Math.abs(dist) * this.p.speedX;
                    this.p.vy = (mustapha.p.y-this.p.y)/Math.abs(dist) * this.p.speedY;
                } 
                
                else {
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
                    /*if(this.p.ataque==0 && dist>300){
                        this.play("atackTank_"+this.p.facing);
                        console.log("atackTank_!!! ");
                    }
                    else {
                        this.play("default_"+this.p.facing);
                    }*/
                    this.play("default_"+this.p.facing);
                }
                else{
                    //Q.audio.play("voces/risaElmer.mp3");
                    this.play("fumandoEspero_"+this.p.facing);
                    
                } 
            }

            
        }
            

    



    });


}