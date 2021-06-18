function loadEnemies(Q) {
    
    //Se generan los compnentes que se utilicen
    
    Q.component("enemigo",{
        added: function(){

            this.entity.add("2d, animation");

            this.entity.p.vx = 0;
            this.entity.p.vy = 0;
            this.entity.p.gravity = 0;
            this.entity.p.sensor = true;
            this.entity.p.isDead = false;
            
            this.entity.p.ataque = 0;
            this.entity.p.deltaAtaque = 0;
            this.entity.p.faseDeAtaque = 0;
            
            this.entity.p.tiempoInvulnerable = 0;
            if(!this.entity.p.duracionInvulnerabilidad) this.entity.p.duracionInvulnerabilidad = 0.5;
            
            this.entity.p.faccion= 2;
            
            if(!this.entity.p.facing) this.entity.p.facing = "right";
            
            if(!this.entity.p.puntuacion) this.entity.p.puntuacion = 100;
            
            if(!this.entity.p.ataques) this.entity.p.ataques = [];
            if(!this.entity.p.vida) this.entity.p.vida = 10;
            
            if(!this.entity.p.offsetSuperiorVida) this.entity.p.offsetSuperiorVida = 0;
            
            this.entity.p.maxVida = this.entity.p.vida;
            
            this.entity.p.isDead = false;
            if(!this.entity.p.animacionMuerte) this.entity.p.animacionMuerte = "dead";
            
            //estas funciones se incluyen solo si no están ya definidas
            if(!this.entity.animarAtaque) this.entity.animarAtaque = this.animarAtaque;
            if(!this.entity.atacar) this.entity.atacar = this.atacar;
            if(!this.entity.procesarAtaque) this.entity.procesarAtaque = this.procesarAtaque;
            if(!this.entity.damage) this.entity.damage = this.damage;
            if(!this.entity.procesarInvulnerabilidad) this.entity.procesarInvulnerabilidad = this.procesarInvulnerabilidad;
            
            this.entity.oldDrawFunction = this.entity.draw
            this.entity.draw = this.draw;
            
            
            this.entity.play("default_"+this.entity.p.facing);
        },
        
        atacar: function() {
            
            this.p.vx = this.p.vy = 0;
            //se escoge aleatoriamente un ataue de entre todos los disponibles
            this.p.ataque = Math.floor(Math.random()*this.p.ataques.length)+1;
            //console.log("Ataque escogido: " + this.p.ataque);
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
        
        damage: function( damage, nockback, faccion) {
            
            if(this.p.isDead) return;
            if(faccion==this.p.faccion) return;
            if(this.p.tiempoInvulnerable>0) return;
            
            PUNTOS_GLOBALES += damage * 10;
            
            this.p.vida =  Math.max( this.p.vida - damage , 0);
            
            Q.audio.play("efectos/damageToEnemy.mp3");
            //console.log("Vida de enemigo: "+this.p.vida);
            this.p.tiempoInvulnerable = this.p.duracionInvulnerabilidad; 
            
            if(this.p.vida <= 0 ) {
                //this.destroy();
                
                this.p.isDead = true;
                //console.log("¿MUERTO? "+this.p.isDead);
                this.play(this.p.animacionMuerte+"_"+this.p.facing);
                this.p.points = [[-1000000,-1000000],[-1000001,-1000000],[-1000001,-1000001],[-1000000,-1000001]];
                //this.p.points = [[0,0],[0,0],[0,0],[0,0]];
                PUNTOS_GLOBALES += this.p.puntuacion;
                //this.destroy();
                
                Q.audio.play(this.p.sonidoMuerte);
                
                var that = this;
                setTimeout( function(){that.destroy();}, 6000);
                
                
            }
        },
       
        
        procesarInvulnerabilidad: function(dt) {
            
            this.p.tiempoInvulnerable = Math.max(
                this.p.tiempoInvulnerable -= dt,
                0
            );
            if(this.p.tiempoInvulnerable>0) this.p.opacity = 0.6;
            else this.p.opacity = 1;
        },
        
        draw: function(ctx) {
            if(!this.p.isDead){
                ctx.fillStyle = "white";
                ctx.fillRect(-15, -this.p.cy+1+this.p.offsetSuperiorVida, 30, 5);
                ctx.fillStyle = "yellow";
                ctx.fillRect(-14, -this.p.cy+2+this.p.offsetSuperiorVida, (this.p.vida*28)/this.p.maxVida, 3);
                ctx.fillStyle = "red";
                ctx.fillRect(-14+(this.p.vida*28)/this.p.maxVida, -this.p.cy+2+this.p.offsetSuperiorVida, 28-(this.p.vida*28)/this.p.maxVida, 3);
            }
            this.oldDrawFunction(ctx);
        }

    })
    
    //Llama a las funciones de carga de cada enemigo
    loadMorgan(Q);
    loadFerris(Q);
    loadElmer(Q);
    loadLash(Q);
    
}